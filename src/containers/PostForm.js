import React from 'react';
import { Form, Button, Container } from 'semantic-ui-react';
import serializeForm from 'form-serialize';

const resetForm = () => {
  document.getElementById('formTitle').value = '';
  document.getElementById('formId').value = '';
  document.getElementById('formAuthor').value = '';
  document.getElementById('formBody').value = '';
  document.getElementById('formAuthor').removeAttribute('disabled');
}

const handleSubmit = (event, onSubmit, category) => {
  event.preventDefault();
  const values = serializeForm(event.target, { hash: true });
  onSubmit(values, category);
  resetForm();
}

class PostForm extends React.Component {

  render () {
    const { onSubmit, showTitle, values, category } = this.props;

    return (
      <Container>
        {(showTitle) && (values) && (
          <h2>Edit Post</h2>
        )}
        {(showTitle) && (!values) && (
          <h2>Add Post</h2>
        )}
        <Form id='formComment' reply onSubmit={(e) => handleSubmit(e, onSubmit, category)}>
          <Form.Input
            type='hidden'
            name='formId'
            id='formId'
            value={(values) && values.id}/>
          <Form.Input
            type={(!showTitle) ? 'hidden' : 'text'}
            name='formTitle'
            id='formTitle'
            fluid
            placeholder='Title'
            required={true}
            defaultValue={(values) && values.title}/>
          <Form.Input
            name='formAuthor'
            id='formAuthor'
            fluid
            placeholder='Author'
            required={true}
            value={(values) && values.author}
          />
          <Form.TextArea
            name='formBody'
            id='formBody'
            placeholder='Type your text here...'
            required={true}
            defaultValue={(values) && values.body}/>
          <Button content='Submit' primary/>
          {!(values) && (
            <Button
              content='Reset'
              primary
              onClick={(e) => {
                e.preventDefault();
                resetForm(e);
              }}/>
          )}
        </Form>
      </Container>
    );
  }
}

export default PostForm;
