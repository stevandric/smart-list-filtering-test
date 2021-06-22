export interface FormData {
  prop: string;
  label: string;
  control: string;
  required: boolean;
  readOnly: boolean;
  columns: number;
}

export const FormElements = {
  input: 'input',
  textarea: 'textarea'
};

export const PostForm: FormData[] = [
  {
    prop: 'userId',
    label: 'User ID',
    control: FormElements.input,
    required: true,
    readOnly: true,
    columns: 6,
  },
  {
    prop: 'title',
    label: 'Title',
    control: FormElements.input,
    required: true,
    readOnly: false,
    columns: 6,
  },
  {
    prop: 'body',
    label: 'Details',
    control: FormElements.textarea,
    required: true,
    readOnly: false,
    columns: 12,
  },
];
