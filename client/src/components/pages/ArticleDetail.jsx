import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";

export default function ArticleDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [article, setArticle] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchArticle = async () => {
      try {
        const response = await axios.get(`http://localhost:5000/api/articles/public/${id}`);
        if (response.data && response.data.success) {
          setArticle(response.data.data);
        } else {
          setError("Không tìm thấy bài viết");
        }
      } catch (err) {
        setError("Lỗi khi tải bài viết: " + err.message);
      } finally {
        setLoading(false);
      }
    };
    fetchArticle();
  }, [id]);

  if (loading) {
    return (
      <div className="min-h-screen bg-emerald-50 dark:bg-emerald-950 flex items-center justify-center pt-24 text-emerald-700">
        <p className="text-xl">Đang tải...</p>
      </div>
    );
  }

  if (error || !article) {
    return (
      <div className="min-h-screen bg-emerald-50 dark:bg-emerald-950 flex flex-col items-center justify-center pt-24 space-y-6 text-emerald-700">
        <p className="text-xl">{error || "Bài viết không tồn tại"}</p>
        <button
          onClick={() => navigate("/")}
          className="bg-emerald-700 text-white px-6 py-2 rounded-sm hover:bg-emerald-800 transition-colors"
        >
          Quay lại Trang Chủ
        </button>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-emerald-50 dark:bg-emerald-950 pt-32 pb-20 px-6 md:px-12">
      <div className="max-w-4xl mx-auto bg-white dark:bg-emerald-900 shadow-xl rounded-lg overflow-hidden border border-emerald-100 dark:border-emerald-800">
        {/* Nút quay lại */}
        <div className="p-6 border-b border-emerald-100 dark:border-emerald-800">
          <button
            onClick={() => navigate(-1)}
            className="text-emerald-700 dark:text-emerald-400 font-medium hover:underline flex items-center gap-2"
          >
            ← Lùi lại
          </button>
        </div>

        {/* Thumbnail bài viết */}
        {article.ImageUrl && (
          <div className="w-full h-[400px] overflow-hidden">
            <img
              src={article.ImageUrl}
              alt={article.Title}
              className="w-full h-full object-cover"
            />
          </div>
        )}

        {/* Nội dung bài viết */}
        <div className="p-8 md:p-12">
          <span className="font-sans text-emerald-600 uppercase tracking-[0.2em] text-xs font-bold mb-4 block">
            Tin Tức / {new Date(article.CreatedAt).toLocaleDateString('vi-VN')}
          </span>
          <h1 className="text-4xl md:text-5xl font-bold font-['Noto_Serif'] mb-6 text-emerald-950 dark:text-emerald-50 leading-tight">
            {article.Title}
          </h1>
          <div className="w-16 h-[3px] bg-emerald-500 mb-8"></div>

          <p className="text-xl text-emerald-800 dark:text-emerald-200 font-['Noto_Serif'] italic mb-10 leading-relaxed border-l-4 border-emerald-500 pl-6">
            {article.Summary}
          </p>

          {/* Phần Content */}
          <div className="prose prose-emerald lg:prose-lg dark:prose-invert max-w-none text-emerald-900 dark:text-emerald-100 font-sans leading-loose whitespace-pre-wrap">
            {article.Content || "Nội dung đang được cập nhật..."}
          </div>
        </div>
      </div>
    </div>
  );
}
