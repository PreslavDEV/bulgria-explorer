import { useCallback, useState } from "react";
import { router } from "expo-router";
import { useInjection } from "inversify-react";
import { observer } from "mobx-react-lite";

import CreatePostForm from "@/components/forms/create-post/create-post-form";
import { ICreatePostData } from "@/components/forms/create-post/interface";
import { TYPES } from "@/configs/di-types.config";
import { useHandleError } from "@/hooks/use-handle-error";
import { AuthStore } from "@/stores/auth/auth.store";
import { PostStore } from "@/stores/post/post.store";

export const CreatePostContainer = observer(() => {
  const { createPost, uploadingImages, creatingPost } = useInjection<PostStore>(
    TYPES.PostStore,
  );
  const { user } = useInjection<AuthStore>(TYPES.AuthStore);
  const [key, setKey] = useState(0);

  const setError = useHandleError();

  const handleCreatePost = useCallback(
    async (data: ICreatePostData) => {
      try {
        await createPost(data, user);
        setKey((prev) => prev + 1);
        router.push("/(tabs)/");
      } catch (error) {
        setError(error);
      }
    },
    [createPost, setError, user],
  );

  return (
    <CreatePostForm
      key={key}
      onSubmit={handleCreatePost}
      uploadingImages={uploadingImages}
      creatingPost={creatingPost}
    />
  );
});
