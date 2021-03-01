import { useState, useCallback, useRef } from 'react'
import { TextField, Form, FormLayout, Button, Toast, Frame, Banner } from '@shopify/polaris'
import { checkEmail } from '../../util/validator'

let error = ''

function FormOnSubmitExample() {
  const [email, setEmail] = useState('');

  const handleSubmit = useCallback((_event) => {
    if (email === '') {
      setActive(true)
    }
  }, []);

  const handleEmailChange = useCallback((value) => setEmail(value), []);

  const [active, setActive] = useState(false);

  const toggleActive = useCallback(() => setActive((active) => !active), []);

  // const toastMarkup = active ? (
  //   <Toast content="Message sent" onDismiss={toggleActive} duration={4500} />
  // ) : null;

  const toastMarkup = active ? (
    <Banner
      title="Your shipping label is ready to print."
      status="success"
      action={{ content: 'Print label' }}
      onDismiss={ toggleActive }
    />
  ) : null;

  return (
    <Frame>
      <Form onSubmit={handleSubmit}>
        <FormLayout>

          <TextField
            value={email}
            onChange={handleEmailChange}
            label="Email"
            type="email"
            helpText={
              <span>
                We’ll use this email address to inform you on future changes to
                Polaris.
            </span>
            }
          />

          <Button submit>Submit</Button>
          {toastMarkup}
        </FormLayout>
      </Form>
    </Frame>
  );
}
export default FormOnSubmitExample