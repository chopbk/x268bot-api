const mongoose = require('mongoose');

const findOrCreate = require('./plugins/findOrCreate');
const toJSON = require('./plugins/toJSON');
const Schema = mongoose.Schema;
//Create Schema
const ConfigSchema = new Schema(
  {
    env: {
      type: String,
      index: true,
      unique: true,
    },
    blacklist: {
      type: [String],
      default: ['BTCUSDT', 'ETHUSDT'],
    },
    whitelist: {
      type: [String],
      default: [],
    },
    signals: {
      type: [String],
      default: [],
    },
    trade_config: {
      FIX_COST_AMOUNT: {
        type: Number,
        default: 100,
      },
      FIX_LEVERAGE: {
        type: Number,
        default: 20,
      },
      LONG_LEVERAGE: {
        type: Number,
        default: 20,
      },
      SHORT_LEVERAGE: {
        type: Number,
        default: 20,
      },
      CLOSE_TP_PERCENT: {
        type: Number,
        default: 1,
      },
      HP: {
        type: Object,
        default: {
          ON: false,
          HP_PERCENT_TRIGGER: 0.45,
          RHSL_PERCENT: 0.1,
          RH_PERCENT: 0.1,
        },
      },
      SP: {
        SP_PERCENT: {
          type: Number,
          default: 0.01,
        },
        SP_PERCENT_TRIGGER: {
          type: Number,
          default: 0.5,
        },
        R_PERCENT: {
          type: Number,
          default: 0.5,
        },
      },
      SL: {
        TYPE: {
          type: String,
          default: 'MARKET',
        },
        SL_PERCENT: {
          type: Number,
          default: -0.3,
        },
        SL2_PERCENT: {
          type: Number,
          default: -0.4,
        },
        SLI_PERCENT: {
          type: Number,
          default: -0.3,
        },
        SL_TIME: {
          type: Number,
          default: 1.5,
        },
        POSITION: {
          type: Boolean,
          default: false,
        },
      },
      OPEN: {
        TYPE: {
          type: String,
          enum: ['MARKET', 'BOTH', 'LIMIT'],
          default: 'MARKET',
        },
        LIMIT: {
          type: Boolean,
          default: false,
        },
        MARKET: {
          type: Boolean,
          default: true,
        },
        SPREAD: {
          type: Number,
          default: 0.05,
        },
        WAIT: {
          type: Number,
          default: 30,
        },
      },
      COPY: {
        type: Object,
        default: {
          ON: false,
          MAX_VOLUME: 20000,
          RATE: 0.1,
          FIX: false,
          DCA: true,
          FOLLOW: true,
        },
      },
      INTERVAL: {
        type: Number,
        default: 60,
      },
      NUM_TRAILING: {
        type: Number,
        default: 5,
      },
      WL: {
        type: Boolean,
        default: true,
      },
      TRAILING: {
        type: Boolean,
        default: true,
      },
      ON: {
        type: Boolean,
        default: true,
      },
      LONG: {
        type: Boolean,
        default: true,
      },
      SHORT: {
        type: Boolean,
        default: false,
      },
      INVERT: {
        type: Boolean,
        default: false,
      },
      TP_PERCENT: {
        type: Array,
        default: [0.3, 1],
      },

      PAPER: {
        type: Boolean,
        default: false,
      },
      // SL_PERCENT: {
      //     type: Number,
      //     default: -0.3,
      // },

      SP_PERCENT: {
        type: Number,
        default: 0.1,
      },
      SP_PERCENT_TRIGGER: {
        type: Number,
        default: 0.5,
      },
      R_PERCENT: {
        type: Number,
        default: 0.2,
      },
      // end will delete when done
    },
  },
  {
    versionKey: false,
    timestamps: true,
  }
);

ConfigSchema.plugin(findOrCreate);
ConfigSchema.plugin(toJSON);

ConfigSchema.methods.toPayload = function toPayload() {
  return {
    config: this.trade_config,
    signals: this.signals,
    blacklist: this.blacklist,
    env: this.env,
  };
};

const AccountConfig = mongoose.model('Account_Config', ConfigSchema);

module.exports = AccountConfig;
