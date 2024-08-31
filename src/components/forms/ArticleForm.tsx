import React, { useMemo, useRef } from "react";
import { useForm } from "react-hook-form";
import TextBox from "../core/TextBox";
import Button from "../core/Button";
import * as types from "../../types/index";
import Select from "react-select";

interface ILoginFormProps {
  onSave: (formData: types.ILoginFormData) => void;
  errorMessage?: string;
}

const ArticleForm: React.FC<ILoginFormProps> = ({
  onSave,
  errorMessage,
  tags,
}) => {
  const {
    setValue,
    register,
    formState: { errors },
    handleSubmit,
  } = useForm({
    defaultValues: {
      title: "",
      employeeDescription: "",
      clientDescription: "",
      tags: [],
    },
    mode: "onChange",
  });

  const handleChange = (selectedOptions): void => {
    const selectedTags = selectedOptions.map((option) => ({
      _id: option.value,
      name: option.label,
    }));

    setValue("tags", selectedTags);
  };

  const tagOptions = useMemo(
    () =>
      tags?.map((tag) => ({
        value: tag._id,
        label: tag.name,
      })),
    [tags]
  );

  const onSubmit = handleSubmit((data) => {
    onSave(data);
  });

  return (
    <form
      onSubmit={onSubmit}
      className="form-container grid grid-cols-[3fr_2fr] gap-x-14 gap-y-8 py-10 bg-white w-full h-full"
    >
      <div className="flex flex-col gap-10 h-fit">
        <TextBox
          placeholder="Jak dodać wycieczkę ?"
          type="text"
          name="title"
          label="Tytuł"
          className="w-full rounded-lg"
          register={register("title", {
            required: "Tytuł jest wymagany",
          })}
          error={errors.title ? errors.title.message : ""}
        />

        <div>
          <label className=" block mb-1.5 " htmlFor="clientDescription">
            Odpowiedź dla klienta
          </label>
          <textarea
            style={{
              minHeight: "400px",
              maxHeight: "400px",
              resize: "none",
              overflow: "auto",
            }}
            id="clientDescription"
            placeholder="wiadomosc dla klienta"
            className="w-full border border-dashed rounded-lg py-2 px-2.5"
            {...register("clientDescription", {
              required: {
                value: true,
                message: "Odpowiedz dla klienta jest wymagana",
              },
              minLength: {
                value: 6,
                message: "Password length must be at least 6 characters",
              },
            })}
          />
          {errors.clientDescription && (
            <span className="text-[11px] text-rose-500 font-semibold mt-0.5">
              {errors.clientDescription.message}
            </span>
          )}
        </div>

        {errorMessage && (
          <span className="block text-center font-semibold text-sm text-rose-600">
            {errorMessage}
          </span>
        )}
      </div>

      <div className="flex flex-col gap-5">
        <div>
          <label className=" block mb-1.5 " htmlFor="employeeDescription">
            Odpowiedź dla pracownika
          </label>
          <textarea
            style={{
              minHeight: "260px",
              maxHeight: "300px",
              resize: "none",
              overflow: "auto",
            }}
            id="employeeDescription"
            placeholder="opis dla pracownika HD"
            className="w-full border border-dashed rounded-lg py-2 px-2.5"
            {...register("employeeDescription", {
              required: {
                value: true,
                message: "Opis dla pracownika jest wymagany",
              },
              minLength: {
                value: 6,
                message: "Password length must be at least 6 characters",
              },
            })}
          />
          {errors.employeeDescription && (
            <span className="text-[11px] text-rose-500 font-semibold mt-0.5">
              {errors.employeeDescription.message}
            </span>
          )}
        </div>
        <div>
          <label className=" block mb-1.5 " htmlFor="tags">
            Wybierz Tag
          </label>
          <Select
            id="tags"
            closeMenuOnSelect={true}
            options={tagOptions}
            isMulti={true}
            isSearchable={true}
            placeholder="Wybierz Tag"
            onChange={handleChange}
          />
        </div>
      </div>
      <Button
        type="submit"
        label="Utwórz"
        className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
      />
    </form>
  );
};

export default ArticleForm;
