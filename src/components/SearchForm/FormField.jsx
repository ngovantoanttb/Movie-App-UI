import { Controller } from 'react-hook-form';

const FormField = ({ control, label, name, Component }) => {
  return (
    <div>
      <div className="mb-1">
        <div className='font-bold'>{label}</div>
        <Controller
          name={name}
          control={control}
          render={({ field: { onChange, value, name } }) => {
            return <Component onChange={onChange} value={value} name={name} control={control} />;
          }}
        />
      </div>
    </div>
  );
};

export default FormField;
