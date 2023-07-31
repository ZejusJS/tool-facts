import { Schema, model, models } from 'mongoose';
const maxFactLength = process.env.MAX_FACT_LENGTH
const maxUsernameLength = process.env.MAX_USERNAME_LENGTH

const factSchema = new Schema({
    username: {
        type: String,
        required: true,
        maxLength: maxUsernameLength
    },
    cs: {
        type: String,
        maxlength: maxFactLength,
        trim: true
    },
    en: {
        type: String,
        maxlength: maxFactLength,
        trim: true
    },
    show: {
        default: false,
        type: Boolean
    },
    id: {
        type: String,
        trim: true,
        maxLength: 50,
        index: {
            unique: true,
            partialFilterExpression: { id: { $type: "string" } }
        }
    }
});

factSchema.pre('save', function (next) {
    if (!this.id || !this.id.length) this.id = this._id.toString();
    this.id = this.id.replace(/\s+/g, '-');
    this.id = this.id.replace(/(?=[1-9])|(?=[-])|[?!^\u0000-\u0040\u005B-\u0060\u007B-\u00BF\u02B0-\u036F\u00D7\u00F7\u2000-\u2BFF]/g, '');

    next();
});

factSchema.pre('findOneAndUpdate', function (next) {
    const update: any = this.getUpdate();

    if (!update.id || !update.id.length) update.id = update._id.toString();
    update.id = update.id.replace(/\s+/g, '-');
    update.id = update.id.replace(/(?=[1-9])|(?=[-])|[?!^\u0000-\u0040\u005B-\u0060\u007B-\u00BF\u02B0-\u036F\u00D7\u00F7\u2000-\u2BFF]/g, '');

    console.log(update);

    next();
});

const Fact = models.Fact || model('Fact', factSchema);

export default Fact;