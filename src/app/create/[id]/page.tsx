import { notFound } from "next/navigation";
import { createClient } from "@/lib/supabase/server";
import { PostcardEditor } from "@/components/editor/PostcardEditor";

interface Props {
  params: Promise<{ id: string }>;
}

export default async function EditPostcardPage({ params }: Props) {
  const { id } = await params;
  const supabase = await createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) notFound();

  const { data: postcard } = await supabase
    .from("postcards")
    .select("*")
    .eq("id", id)
    .eq("user_id", user.id)
    .single();

  if (!postcard) notFound();

  return <PostcardEditor existing={postcard} />;
}
