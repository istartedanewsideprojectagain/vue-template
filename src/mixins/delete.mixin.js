import FlashUtils from '@/utils/flash.utils';

const STATES = {
  LOADING: 'loading', ERROR: 'error', IDLE: 'idle',
};

const DeleteMixin = {
  data: () => ({
    deleteMixin: {
      state: STATES.IDLE,
      STATES,
      config: {
        delete: 'delete',
        callback: 'callback',
      },
    },
  }),
  methods: {
    remove(id) {
      this.deleteMixin.state = this.deleteMixin.STATES.LOADING;
      this[this.deleteMixin.config.delete](id).then(() => {
        this.deleteMixin.state = this.deleteMixin.STATES.IDLE;
        this.$emit('deleted', id);
        FlashUtils.sendSuccess('La suppression à réussie.');
      }).catch(() => {
        this.deleteMixin.state = this.deleteMixin.STATES.ERROR;
        FlashUtils.sendError('La suppression a échoué');
      });
    },
  },
};

export default DeleteMixin;
