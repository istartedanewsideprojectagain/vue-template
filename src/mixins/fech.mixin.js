import PaginationUtils from '@/utils/pagination.utils';

const STATES = {
  IDLE: 'idle', EMPTY: 'empty', LOADING: 'loading', ERROR: 'error',
};
const FetchMixin = {
  data: () => ({
    fetchMixin: {
      state: STATES.IDLE,
      STATES,
      pagination: null,
      config: {
        dataField: 'data',
        fetch: 'fetch',
        fetchById: 'fetchById',
        dataFieldOne: 'dataOne',
      },
    },
  }),
  computed: {
    isIdle() {
      return this.fetchMixin.state === STATES.IDLE;
    },
    isLoading() {
      return this.fetchMixin.state === STATES.LOADING;
    },
    isError() {
      return this.fetchMixin.state === STATES.ERROR;
    },
  },
  methods: {
    updatePagination({ page, size }) {
      this.fetchMixin.pagination.page = page;
      this.fetchMixin.pagination.size = size;
      this.fetch();
    },
    fetchById(id) {
      this.fetchMixin.state = this.fetchMixin.STATES.LOADING;
      this[this.fetchMixin.config.fetchById](id).then(({ data }) => {
        this.$data[this.fetchMixin.config.dataFieldOne] = data || {};
        this.fetchMixin.state = this.fetchMixin.STATES.IDLE;
      }).catch(() => {
        this.fetchMixin.state = this.fetchMixin.STATES.ERROR;
      });
    },
    fetch() {
      this.fetchMixin.state = this.fetchMixin.STATES.LOADING;
      this[this.fetchMixin.config.fetch]().then(({ data, headers }) => {
        this.$data[this.fetchMixin.config.dataField] = data || [];
        this.fetchMixin.pagination = PaginationUtils.fromHeaders(headers);
        this.fetchMixin.state = this.fetchMixin.STATES.IDLE;
      }).catch(() => {
        this.fetchMixin.state = this.fetchMixin.STATES.ERROR;
      });
    },
    fetchMore() {
      this.fetchMixin.pagination.page += 1;
      this.fetchMixin.state = this.fetchMixin.STATES.LOADING;
      const currentData = this.$data[this.fetchMixin.config.dataField];
      this[this.fetchMixin.config.fetch]().then(({ data, headers }) => {
        this.$data[this.fetchMixin.config.dataField] = [...currentData, ...data] || [];
        this.fetchMixin.pagination = PaginationUtils.fromHeaders(headers);
        const state = (this.$data[this.fetchMixin.config.dataField] < 1)
          ? this.fetchMixin.STATES.EMPTY : this.fetchMixin.STATES.IDLE;
        this.fetchMixin.state = state;
      }).catch(() => {
        this.fetchMixin.state = this.fetchMixin.STATES.ERROR;
      });
    },
  },
};

export default FetchMixin;
