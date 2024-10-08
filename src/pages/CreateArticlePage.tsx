import React from "react";
import ArticleForm from "../components/forms/ArticleForm";
import { TbArticleFilled } from "react-icons/tb";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { tagsApi } from "../services/tagsApi";
import { articlesApi } from "../services/articlesApi";
import { useAppContext } from "../contexts/AppContext";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import ToastVariant from "../components/core/ToastVariant";

const CreateArticlePage = () => {
  const { showToast, isLoggedIn } = useAppContext();
  const queryClient = useQueryClient();
  const navigate = useNavigate();

  const { data: tags } = useQuery({
    queryFn: () => {
      return tagsApi.getAllTags();
    },
    queryKey: ["tags"],
    refetchOnWindowFocus: false,
  });

  const { mutate } = useMutation({
    mutationFn: ({ title, tags, employeeDescription, clientDescription }) => {
      return articlesApi.createArticle({
        title,
        tags,
        employeeDescription,
        clientDescription,
      });
    },
    onSuccess: () => {
      toast.custom((t) => (
        <ToastVariant t={t} message="Artykuł został dodany"variant="SUCCESS"/>
        ))
      queryClient.invalidateQueries(["articles"])
      navigate("/articles");
    },
  });

  const onSave = (formData) => {
    mutate(formData);
  };

  return (
    <div className=" min-h-[calc(100vh-6rem)] pt-10 px-2 pb-14 rounded-lg ">
      <h2 className="flex items-center gap-x-1.5 text-2xl font-semibold text-slate-500">
        <TbArticleFilled className="w-8 h-8 text-blue-700" /> Dodaj artykuł
      </h2>
      <ArticleForm tags={tags} onSave={onSave} />
    </div>
  );
};

export default CreateArticlePage;
