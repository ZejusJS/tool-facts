import { Schema, model, models } from 'mongoose';

const factSchema = new Schema({
    name: String
});

const Fact = models.Fact || model('Fact', factSchema);

export default Fact;