import { Schema, model, models } from 'mongoose';
const maxFactLength = process.env.MAX_FACT_LENGTH
const maxUsernameLength = process.env.MAX_USERNAME_LENGTH

const factSchema = new Schema({
    username: {
        type: String,
        required: true,
        maxlength: maxUsernameLength
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
    }
});

const Fact = models.Fact || model('Fact', factSchema);

export default Fact;