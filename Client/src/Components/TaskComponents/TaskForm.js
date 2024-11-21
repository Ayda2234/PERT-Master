import React from 'react';
import { Field, Form, Formik } from 'formik';
import {
  Box,
  Button,
  Input,
  FormControl,
  FormLabel,
  FormErrorMessage,
  Select,
} from '@chakra-ui/react';
const TaskForm = ({ handleSubmit, TasksArray }) => {

  const validateDate = (value) => {
    let error;
    if (!value) {
      error = 'Date is required';
    } else if (!/^\d{4}-\d{2}-\d{2}$/.test(value)) {
      error = 'Please enter a valid date (YYYY-MM-DD)';
    }
    return error;
  };

  return (
    <Box m='30px'>
      <Formik
        initialValues={{ name: '', description: '', date_start: '', duration: '', date_end: '', predecesseur: '' }}
        onSubmit={(values, actions) => handleSubmit(values, actions)}
        m='100px'
      >
        {(props) => (
          <Form>
            <Field name='name' >
              {({ field, form }) => (
                <FormControl isInvalid={form.errors.name && form.touched.name}>
                  <FormLabel>Tache</FormLabel>
                  <Input {...field} placeholder='Task' />
                  <FormErrorMessage>{form.errors.name}</FormErrorMessage>
                </FormControl>
              )}
            </Field>
            <Field name='description' >
              {({ field, form }) => (
                <FormControl isInvalid={form.errors.description && form.touched.description}>
                  <FormLabel>Descriptions</FormLabel>
                  <Input {...field} placeholder='description' />
                  <FormErrorMessage>{form.errors.description}</FormErrorMessage>
                </FormControl>
              )}
            </Field>
            <Field name='date_start'>
              {({ field, form }) => (
                <FormControl isInvalid={form.errors.date_start && form.touched.date_start}>
                  <FormLabel>Date De Debut De Projet</FormLabel>
                  <Input {...field} type="date" placeholder='YYYY-MM-DD' />
                  <FormErrorMessage>{form.errors.date_start}</FormErrorMessage>
                </FormControl>
              )}
            </Field>
            <Field name='duration'>
              {({ field, form }) => (
                <FormControl isInvalid={form.errors.duration && form.touched.duration}>
                  <FormLabel>Durée Du Projet</FormLabel>
                  <Input
                    {...field}
                    type='number'
                    pattern='[0-9]*'
                    inputMode='numeric'
                    placeholder='durée'
                  />
                  <FormErrorMessage>{form.errors.duration}</FormErrorMessage>
                </FormControl>
              )}
            </Field>
            <Field name='date_end' validate={validateDate}>
              {({ field, form }) => (
                <FormControl isInvalid={form.errors.date_end && form.touched.date_end}>
                  <FormLabel>Date De Fin De Projet</FormLabel>
                  <Input {...field} type="date" placeholder='YYYY-MM-DD' />
                  <FormErrorMessage>{form.errors.date_end}</FormErrorMessage>
                </FormControl>
              )}
            </Field>
            <Field name='predecesseur'>
              {({ field, form }) => (
                <FormControl isInvalid={form.errors.predecesseur && form.touched.predecesseur}>
                  <FormLabel>Predecesseur</FormLabel>
                  <Select {...field} placeholder='Selectionnez un predecesseur'>
                    {TasksArray.map((task) => (
                      <option key={task._id} value={task._id}>
                        {task.task_name}
                      </option>
                    ))
                    }
                  </Select>
                  <FormErrorMessage>{form.errors.predecesseur}</FormErrorMessage>
                </FormControl>
              )}
            </Field>
            <Button mt={4} color='white'
              bg='black'
              _hover={{ bg: 'gray.500' }} isLoading={props.isSubmitting} onClick={props.handleSubmit}>
              Submit
            </Button>
          </Form>
        )}
      </Formik>

    </Box>);
}

export default TaskForm;