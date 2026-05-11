import { AllFieldsTypes } from "../types/all-fields";
import AutocompleteField from "./autocomplete-field";
import AutocompleteOneTimeFetchField from "./autocomplete-field-one-time-fetch";
import AutocompleteServerField from "./autocomplete-server-field";
import CheckboxField from "./checkbox-field";
import DateField from "./datetime/date-field";
import FileUploadField from "./file-upload-field";
import InputField from "./input-field";
import PhoneNumberInputField from "./phone-number-field/phone-number-field";
import RadioField from "./radio-field";
import SwitchField from "./switch-field";
import TextEditorField from "./text-editor-field";

const map: Record<
  Exclude<AllFieldsTypes, "field-array" | "custom">,
  unknown
> = {
  autocomplete: AutocompleteField,
  "autocomplete-one-time-fetch": AutocompleteOneTimeFetchField,
  "autocomplete-server": AutocompleteServerField,
  checkbox: CheckboxField,
  "datetime-local": DateField,
  "file-upload": FileUploadField,
  input: InputField,
  radio: RadioField,
  switch: SwitchField,
  "phone-number": PhoneNumberInputField,
  "text-editor": TextEditorField,
};

export default map;
