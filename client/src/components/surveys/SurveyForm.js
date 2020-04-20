import React, { Component } from 'react';
import _ from 'lodash';
import { Link } from 'react-router-dom';
import { reduxForm, Field } from 'redux-form';
import SurveyField from './SurveyField';
import validateEmails from '../../utils/validateEmails';
import formFields from './formFields';

class SurveyForm extends Component {
  renderFields() {
    return _.map(formFields, ({ label, name }) => {
      return (
        <Field
          key={name}
          component={SurveyField}
          type='text'
          label={label}
          name={name}
        />
      );
    });
  }

  render() {
    return (
      <div>
        <form onSubmit={this.props.handleSubmit(this.props.onSurveySubmit)}>
          {this.renderFields()}
          <Link to='/surveys' className='red btn-flat white-text'>
            Cancel
          </Link>
          <button type='submit' className='teal btn-flat right white-text'>
            Next <i className='material-icons right'>done</i>
          </button>
        </form>
      </div>
    );
  }
}

//Validate inputs
function validate({ body, title, subject, recipients }) {
  const errors = {};

  if (!title) {
    errors.title = 'You must provide a title';
  }
  if (!subject) {
    errors.subject = 'You must provide a subject';
  }
  if (!body) {
    errors.body = 'You must provide a body';
  }
  errors.recipients = validateEmails(recipients || '');
  if (!recipients) {
    errors.recipients = 'You must provide at least one recipient';
  }
  return errors;
}

export default reduxForm({
  validate,
  form: 'surveyForm',
  destroyOnUnmount: false,
})(SurveyForm);
