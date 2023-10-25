import Radio from "@mui/material/Radio";
import RadioGroup from "@mui/material/RadioGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import FormControl from "@mui/material/FormControl";
import FormLabel from "@mui/material/FormLabel";
import {
  Box,
  Button,
  Container,
  Grid,
  IconButton,
  Stack,
  TextField,
  Typography,
} from "@mui/material";

import { initFormQuestion } from "@/utils/initialValues";
import { FormQuestionSchema } from "@/utils/validation/question";
import { useFormik } from "formik";
import React from "react";
import { DatePicker } from "@mui/x-date-pickers";
import Add from "@mui/icons-material/Add";

const FormQuestion = () => {
  const { values, errors, touched, handleChange, handleBlur } = useFormik({
    initialValues: initFormQuestion,
    validationSchema: FormQuestionSchema,
    onSubmit: async (values) => {
      console.log("hi");
    },
  });
  return (
    <Container>
      <Typography variant="h3" textAlign={"center"} gutterBottom>
        Question
      </Typography>
      <Grid container component={"form"} spacing={2}>
        {/* Form question */}
        <Grid item md={6} xs={12}>
          <TextField
            fullWidth
            required
            name="content"
            label="Content"
            value={values.content}
            error={!!(touched.content && errors.content)}
            helperText={touched.content && errors.content}
            onChange={handleChange}
          />
        </Grid>

        <Grid item md={6} xs={12}>
          <FormControl fullWidth>
            <DatePicker label="Expire time" />
          </FormControl>
        </Grid>
        <Grid item md={6} xs={12}>
          <FormControl fullWidth>
            <FormLabel>Category</FormLabel>
            <RadioGroup row name="category">
              <FormControlLabel value="code" control={<Radio />} label="Code" />
              <FormControlLabel value="choice" control={<Radio />} label="Choice" />
              <FormControlLabel
                value="multiple-choice"
                control={<Radio />}
                label="Multiple choice"
              />
            </RadioGroup>
          </FormControl>
        </Grid>

        <Grid item md={6} xs={12}>
          <FormControl fullWidth>
            <FormLabel>Correct answers</FormLabel>
            <Stack flexDirection={"row"} alignItems={"center"} gap={1} width={"100%"}>
              <TextField fullWidth label="Answer" margin="dense" />
              <IconButton className="bg-gradient">
                <Add color="primary" />
              </IconButton>
            </Stack>
          </FormControl>
        </Grid>

        <Grid item md={12} xs={12}>
          <TextField
            fullWidth
            multiline
            label="Explaination"
            name="explaination"
            minRows={4}
            value={values.explaination}
          />
        </Grid>

        <Grid item md={12} xs={12} display={"flex"} justifyContent={"end"}>
          <Button type="submit" variant="contained" sx={{ pr: 2, pl: 2 }}>
            Create
          </Button>
        </Grid>
      </Grid>
    </Container>
  );
};

export default FormQuestion;
