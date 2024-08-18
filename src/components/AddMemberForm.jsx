import React from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { addMemberSchema } from '../utils/validationSchemas';

const AddMemberForm = ({ onAdd }) => {
    const { register, handleSubmit, formState: { errors } } = useForm({
        resolver: zodResolver(addMemberSchema),
    });

    const onSubmit = data => {
        onAdd({ id: Date.now(), ...data });
    };

    return (
        <div>
            <form onSubmit={handleSubmit(onSubmit)}>
                <input {...register('name')} />
                {errors.name && <p>{errors.name.message}</p>}
                <button type="submit">Add Member</button>
            </form>
        </div>
    );
};

export default AddMemberForm;
