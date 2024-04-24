import { useCallback } from "react";
import { useInjection } from "inversify-react";
import { observer } from "mobx-react-lite";

import CreatePostForm from "@/components/forms/create-post/create-post-form";
import { ICreatePostData } from "@/components/forms/create-post/interface";
import { TYPES } from "@/configs/di-types.config";
import { PostStore } from "@/stores/post/post.store";

export const CreatePostContainer = observer(() => {
  const postStore = useInjection<PostStore>(TYPES.PostStore);

  const handleCreatePost = useCallback(
    async (data: ICreatePostData) => {
      console.log(data);
      postStore.test();
    },
    [postStore],
  );

  return <CreatePostForm onSubmit={handleCreatePost} />;
});
