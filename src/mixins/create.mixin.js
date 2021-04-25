import FlashUtils from '@/utils/flash.utils';

const STATES = {
  CREATING: 'creating', ERROR: 'error', IDLE: 'idle',
};

const CreateMixin = {
  data: () => ({
    createMixin: {
      state: STATES.IDLE,
      STATES,
      config: {
        create: 'create',
      },
    },
  }),
  methods: {
    create() {
      this.createMixin.state = this.createMixin.STATES.CREATING;
      this[this.createMixin.config.create]().then(({ data }) => {
        this.createMixin.state = this.createMixin.STATES.IDLE;
        this.$emit('created', data);
        FlashUtils.sendSuccess('La création a réussie.');
      }).catch(() => {
        this.createMixin.state = this.createMixin.STATES.ERROR;
        FlashUtils.sendError('La création a échoué');
      });
    },
  },
  computed: {
    isIdle() {
      return this.createMixin.state === STATES.IDLE;
    },
    isLoading() {
      return this.createMixin.state === STATES.CREATING;
    },
    isError() {
      return this.createMixin.state === STATES.ERROR;
    },
  },
};

export default CreateMixin;
