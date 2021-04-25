import FlashUtils from '@/utils/flash.utils';

const STATES = {
  UPDATING: 'updating', ERROR: 'error', IDLE: 'idle',
};

const UpdateMixin = {
  data: () => ({
    updateMixin: {
      state: STATES.IDLE,
      STATES,
      config: {
        update: 'update',
      },
    },
  }),
  methods: {
    update() {
      this.updateMixin.state = this.updateMixin.STATES.CREATING;
      this[this.updateMixin.config.update]().then(({ data }) => {
        this.updateMixin.state = this.updateMixin.STATES.IDLE;
        this.$emit('updated', data);
        FlashUtils.sendSuccess('La modification à réussie.');
      }).catch(() => {
        this.updateMixin.state = this.updateMixin.STATES.ERROR;
        FlashUtils.sendError('La modification a échoué');
      });
    },
  },
  computed: {
    isIdle() {
      return this.updateMixin.state === STATES.IDLE;
    },
    isLoading() {
      return this.updateMixin.state === STATES.UPDATING;
    },
    isError() {
      return this.updateMixin.state === STATES.ERROR;
    },
  },
};

export default UpdateMixin;
