export type StaffType = {
  _id?: string
  name: string
  email: string
  password?: string
  role?: string
}

export type formDataType = {
  name?: string,
  email: string,
  password: string
}
export type LoginFormProps = {
  onSubmit: (formdata: formDataType) => void;
  error?: string;
  loading?: boolean;
  buttonText?: string;
  showNameField?: boolean;
};