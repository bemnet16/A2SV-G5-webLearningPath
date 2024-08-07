import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import "./contactForm.css";

type formFields = {
  name: string;
  email: string;
  message: string;
};

const ContactForm = () => {
  const form = useForm<formFields>({
    defaultValues: { name: "", email: "", message: "" },
  });
  const { register, handleSubmit, formState, reset } = form;
  const { errors, isSubmitting, isSubmitSuccessful } = formState;
  const [isSubmitSuccess, setIsSubmitSuccess] = useState(false);

  const onSubmit = (data: formFields) => {
    console.log(data);
    reset();
  };

  useEffect(() => {
    if (isSubmitSuccessful) {
      setIsSubmitSuccess(true);
      const notify = setTimeout(() => {
        setIsSubmitSuccess(false);
      }, 1500);
      return () => clearTimeout(notify);
    }
  }, [isSubmitSuccessful]);

  return (
    <>
      <form onSubmit={handleSubmit(onSubmit)} noValidate className="form">
        <div>
          <label htmlFor="name">Name</label>
          <input
            type="text"
            id="name"
            {...register("name", { required: "Name is required!" })}
          />
          {errors.name && <span>{errors.name.message}</span>}
        </div>
        <div>
          <label htmlFor="email">Email</label>
          <input
            type="email"
            id="email"
            {...register("email", {
              required: "Email is required!",
              pattern: {
                value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                message: "Invalid email address!",
              },
            })}
          />
          {errors.email && <span>{errors.email.message}</span>}
        </div>
        <div>
          <label htmlFor="message">Message</label>
          <textarea
            id="message"
            {...register("message", { required: "Message is required!" })}
          />
          {errors.message && <span>{errors.message.message}</span>}
        </div>
        <button type="submit" disabled={isSubmitting}>
          Submit
        </button>
      </form>

      {isSubmitSuccess && <p>Form submitted successfully!</p>}
      {isSubmitting && <p>Submitting form...</p>}
    </>
  );
};

export default ContactForm;
