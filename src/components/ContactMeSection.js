import React, { useEffect } from "react";
import { useFormik, yupToFormErrors } from "formik";
import {
  Box,
  Button,
  FormControl,
  FormErrorMessage,
  FormLabel,
  Heading,
  Input,
  propNames,
  Select,
  Textarea,
  VStack,
} from "@chakra-ui/react";
import * as Yup from 'yup';
import FullScreenSection from "./FullScreenSection";
import useSubmit from "../hooks/useSubmit";
import { useAlertContext } from "../context/alertContext";

const LandingSection = () => {
  const { isLoading, response, submit } = useSubmit();
  const { onOpen } = useAlertContext();

  const formik = useFormik({
    initialValues: {
      firstName: '',
      email: '',
      type: '',
      comment: ''
    },
    onSubmit: (values) => {
      submit('', values) // Promise

    },
    validationSchema: Yup.object({
      firstName: Yup.string().required("First name is required"),
      email: Yup.string().email("Invalid email address").required(),
      type: Yup.string(),
      comment: Yup.string().min(25, 'Must be at least 25 characters').required()
    }),
  });

  useEffect(() => {
    if (!isLoading && response !== null) {
      const { type, message } = response
      onOpen(type, message)
      if (type === 'success') {
        console.log('Success')
        formik.resetForm()
      }
    }
  }, [isLoading])

  return (
    <FullScreenSection
      isDarkBackground
      backgroundColor="#512DA8"
      py={16}
      spacing={8}
    >
      <VStack w="1024px" p={32} alignItems="flex-start">
        <Heading as="h1" id="contactme-section">
          Contact me
        </Heading>
        <Box p={6} rounded="md" w="100%">
          <form onSubmit={formik.handleSubmit}>
            <VStack spacing={4}>
              <FormControl isInvalid={formik.errors.firstName && formik.touched.firstName}>
                <FormLabel htmlFor="firstName">Name</FormLabel>
                <Input
                  id="firstName"
                  name="firstName"
                  {...formik.getFieldProps("firstName")}
                  onChange={(e) => { e.preventDefault(); formik.handleChange(e) }}
                />
                <FormErrorMessage>{formik.errors.firstName}</FormErrorMessage>

              </FormControl>
              <FormControl isInvalid={formik.errors.email && formik.touched.email}>
                <FormLabel htmlFor="email">Email Address</FormLabel>
                <Input
                  id="email"
                  name="email"
                  type="email"
                  {...formik.getFieldProps("email")}
                  onChange={(e) => { e.preventDefault(); formik.handleChange(e) }}
                />
                <FormErrorMessage>{formik.errors.email}</FormErrorMessage>
              </FormControl>

              <FormControl isInvalid={formik.errors.type && formik.touched.type}>
                <FormLabel htmlFor="type">Type of enquiry</FormLabel>
                <Select id="type" name="type" onChange={(e) => { e.preventDefault(); formik.handleChange(e) }}
                >
                  <option value="hireMe">Freelance project proposal</option>
                  <option value="openSource">
                    Open source consultancy session
                  </option>
                  <option value="other">Other</option>

                </Select>
              </FormControl>
              <FormControl isInvalid={formik.errors.comment && formik.touched.comment}>
                <FormLabel htmlFor="comment">Your message</FormLabel>
                <Textarea
                  id="comment"
                  name="comment"
                  height={250}
                  onChange={(e) => { e.preventDefault(); formik.handleChange(e) }}

                />
                <FormErrorMessage>{formik.errors.comment}</FormErrorMessage>
              </FormControl>
              <Button type="submit" colorScheme="purple" width="full">
                Submit
              </Button>
            </VStack>
          </form>
        </Box>
      </VStack>
    </FullScreenSection >
  );
};

export default LandingSection;
