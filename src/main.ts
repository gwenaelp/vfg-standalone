import { createApp, ref, watch, } from 'vue'
import './style.css'
import App from './App.vue'
import VueFormGenerator from '@dashy-soft/vue-form-generator/src/index';
import Emitter from 'tiny-emitter';
import '@dashy-soft/vue-form-generator/dist/vfg.css';

const emitter = new Emitter();
let formSchema = ref({});
let formModel = ref({});

export default ({
  schema,
  model,
  selector,
  onSubmit,
  onChanged,
}) => {

  formSchema.value = schema;
  formModel.value = model || {};
  const app = createApp(App);
	app.component('field-input', VueFormGenerator.fieldsLoader.fieldInput);
	app.component('field-checklist', VueFormGenerator.fieldsLoader.fieldChecklist);
	app.component('field-dateTimePicker', VueFormGenerator.fieldsLoader.fieldDateTimePicker);
	app.component('field-label', VueFormGenerator.fieldsLoader.fieldLabel);
  app.component('field-radios', VueFormGenerator.fieldsLoader.fieldRadios);
	app.component('field-select', VueFormGenerator.fieldsLoader.fieldSelect);

	app.use(VueFormGenerator);
	app.mount(selector || '#app');

  emitter.on('submit', () => {
    if(onSubmit) {
      onSubmit(formModel.value);
    }
  });

  watch(formModel, () => {
    if(onChanged) {
      onChanged(formModel.value);
    }
  });

  return {
  };
};

export { emitter, formSchema, formModel };
