import { getData } from './fetch.js';
import { closeForm, setFormSubmit } from './upload.js';
import './rendering-mini.js';
import './rendering-full.js';
import './redactor.js';

getData();
setFormSubmit(closeForm);
