import React, { useEffect, useState } from "react";
import parse from "html-react-parser";
import { IPost } from "../../types/collections";
import { Link, useNavigate, useParams } from "react-router";
import { useAppSelector } from "../../hooks/useStore";
import databaseService from "../../services/appwrite/database";
import { Button, Image, Loader, PageContainer } from "../../components/ui";
import storageService from "../../services/appwrite/storage";
import { MdDelete } from "react-icons/md";
import { FaRegEdit } from "react-icons/fa";
import {
  displayErrorToast,
  displaySuccessToast,
} from "../../services/toast/displayToast";
import ConfirmationModal from "../../components/ui/ConfirmationModal";

const ViewPost: React.FC = () => {
  const [postData, setPostData] = useState<IPost | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  const [deleteModalOpen, setDeleteModalOpen] = useState<boolean>(false);
  const [isDeletInProgress, setIsDeleteInProgress] = useState<boolean>(false);

  const { isAuthenticated, userData } = useAppSelector(
    (state) => state.authReducer
  );

  const { id } = useParams();
  const navigate = useNavigate();

  const isAuthor =
    postData && userData ? postData.userId === userData.$id : false;

  useEffect(() => {
    const fetchPostData = async () => {
      setLoading(true);

      if (id) {
        try {
          const post = await databaseService.getPostById(id);
          if (post) {
            setPostData(post as unknown as IPost);
            setError(null);
          }
        } catch (error) {
          setError("Failed to load Post. Please refresh this page");
        } finally {
          setLoading(false);
        }
      }
    };

    if (isAuthenticated) {
      fetchPostData();
    }
  }, [id, isAuthenticated]);

  const onDeleteClick = () => {
    setDeleteModalOpen(true);
  };
  const onDeleteCancel = () => {
    setDeleteModalOpen(false);
  };

  const deletePostHandler = () => {
    if (postData && isAuthor) {
      setIsDeleteInProgress(true);

      databaseService.deletePostById(postData.$id).then((status) => {
        if (status) {
          setIsDeleteInProgress(false);

          storageService.deleteFile(postData.featuredImage);
          displaySuccessToast("Post deleted successfully");
          navigate("/");
        }
      });
    } else {
      displayErrorToast({ message: "You cannot delete this post", code: 403 });
    }
  };

  if (loading) {
    return (
      <PageContainer className="flex items-center">
        <Loader size="extraLarge" />
      </PageContainer>
    );
  }

  return (
    <PageContainer>
      {error ? (
        <p className="text-center">{error}</p>
      ) : (
        <>
          <div className="rounded-md border border-card shadow-md">
            {postData && (
              <>
                <div className="border border-card p-2 flex items-center ">
                  <h1 className="w-full text-2xl font-bold sm:pl-4">
                    {postData.title}
                  </h1>

                  {isAuthor && (
                    <div className="flex items-center justify-end space-x-3 w-40 sm:w-72">
                      <Link to={`/post/edit/${postData.$id}`}>
                        <Button
                          variant="outlined"
                          className="flex items-center space-x-2"
                        >
                          <FaRegEdit />
                          <p className="hidden sm:flex">Edit</p>
                        </Button>
                      </Link>

                      <Button
                        variant="destructive"
                        className="flex items-center space-x-2"
                        onClick={onDeleteClick}
                      >
                        <MdDelete />
                        <p className="hidden sm:flex">Delete</p>
                      </Button>
                    </div>
                  )}
                </div>

                <div className="px-2 sm:px-10 py-10 flex flex-col items-center space-y-10">
                  <div className="w-full max-w-[783px] flex items-center justify-evenly">
                    <Image
                      className="w-full object-cover aspect-video rounded-xl"
                      loaderSize="medium"
                      src={storageService
                        .getFileView(postData.featuredImage)
                        .toString()}
                      alt={postData.title}
                    />
                  </div>

                  <div className="w-full max-w-[783px] bg-card rounded-xl p-4 browser-css">
                    {parse(postData.content)}
                  </div>
                </div>
              </>
            )}
          </div>

          <ConfirmationModal
            isOpen={deleteModalOpen}
            modalTitle="Are you sure you want to delete this post?"
            modalDescription="This action cannot be undone. This will permanently delete your video from our servers."
            confirmBtnText="Delete"
            confirmBtnType="destructive"
            onCancelClick={onDeleteCancel}
            onConfirmClick={deletePostHandler}
            cancelBtnDisabled={isDeletInProgress}
            confirmBtnDisabled={isDeletInProgress}
          />
        </>
      )}
    </PageContainer>
  );
};

export default ViewPost;
