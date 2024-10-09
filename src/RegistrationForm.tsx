import { z } from "zod";
import { SubmitHandler, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Box,
  Button,
  Card,
  CardContent,
  FormControl,
  FormHelperText,
  InputLabel,
  MenuItem,
  Select,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import SendIcon from "@mui/icons-material/Send";

//TODO:
// 1. Apply debounce on username field and call a dummy API to check if the username is available.
// 2. Reset the select field
// 3. Find a better way to do the required field validation

const genderOptions = ["Male", "Female", "Other"] as const;

const registrationSchema = z
  .object({
    name: z.string().min(1, { message: "Name is required." }), // A dirty hack for required field
    email: z.string().email(),
    username: z
      .string()
      .min(3, { message: "Username should contain atleast 3 characters." }),
    password: z
      .string()
      .regex(
        /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9]).{8,}$/,
        "Password should have minimum 8 characters, at least 1 uppercase letter, 1 lowercase letter and 1 number."
      ),
    confirm_password: z
      .string()
      .min(1, { message: "Confirm password is required." }), // A dirty hack for required field
    gender: z.enum(genderOptions, {
      errorMap: () => ({ message: "Gender is required." }),
    }),
  })
  .refine((data) => data.password === data.confirm_password, {
    message: "Passwords do not match.",
    path: ["confirm_password"],
  });

type RegistrationFormData = z.infer<typeof registrationSchema>;

const RegistrationForm = () => {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<RegistrationFormData>({
    resolver: zodResolver(registrationSchema),
  });

  const onFormSubmit: SubmitHandler<RegistrationFormData> = (
    formData: RegistrationFormData
  ) => {
    console.log("Form submitted", formData);
    reset();
  };

  return (
    <Card
      variant="outlined"
      sx={{
        margin: "auto",
        boxShadow: 2,
        width: {
          sm: "80%",
          md: "60%",
          lg: "40%",
        },
      }}
    >
      <CardContent>
        <Typography gutterBottom variant="h4" component="p">
          Registration Form
        </Typography>
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            gap: 2,
          }}
          component="form"
          onSubmit={handleSubmit(onFormSubmit)}
        >
          <FormControl>
            <TextField
              {...register("name")}
              label="Name"
              id="name"
              error={errors.name !== undefined}
              helperText={errors.name?.message}
            />
          </FormControl>
          <FormControl>
            <TextField
              {...register("email")}
              label="Email"
              id="email"
              error={errors.email !== undefined}
              helperText={errors.email?.message}
            />
          </FormControl>
          <FormControl>
            <TextField
              {...register("username")}
              label="Username"
              id="username"
              error={errors.username !== undefined}
              helperText={errors.username?.message}
            />
          </FormControl>
          <FormControl error={errors.gender !== undefined}>
            <InputLabel id="selectGender">Select Gender</InputLabel>
            <Select
              defaultValue=""
              {...register("gender")}
              label="Select Gender"
              id="gender"
            >
              <MenuItem value="">Select Gender</MenuItem>
              {genderOptions.map((gender) => (
                <MenuItem key={gender} value={gender}>
                  {gender}
                </MenuItem>
              ))}
            </Select>
            <FormHelperText>{errors.gender?.message}</FormHelperText>
          </FormControl>
          <FormControl>
            <TextField
              {...register("password")}
              label="Password"
              id="password"
              type="password"
              error={errors.password !== undefined}
              helperText={errors.password?.message}
            />
          </FormControl>
          <FormControl>
            <TextField
              {...register("confirm_password")}
              label="Confirm Password"
              id="confirm_password"
              type="password"
              error={errors.confirm_password !== undefined}
              helperText={errors.confirm_password?.message}
            />
          </FormControl>
          <Stack spacing={2} direction="row" justifyContent="flex-end">
            <Button type="submit" variant="contained" endIcon={<SendIcon />}>
              Register
            </Button>
            <Button
              onClick={() => reset()}
              variant="outlined"
              color="error"
              startIcon={<DeleteIcon />}
            >
              Reset
            </Button>
          </Stack>
        </Box>
      </CardContent>
    </Card>
  );
};

export default RegistrationForm;
