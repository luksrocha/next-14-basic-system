import { SnippetEditForm } from "@/components/snippet/SnippetEditForm";
import { db } from "@/db";
import { notFound } from "next/navigation";
import React from "react";

interface EditSnippetPageProps {
    params: {
        slug: string;
    };
}

export default async function EditSnippetPage({
    params,
}: EditSnippetPageProps) {
    const id = Number(params.slug);

    const snippet = await db.snippet.findFirst({
        where: {
            id,
        },
    });

    if (!snippet) {
        notFound();
    }

    return (
        <div>
            <SnippetEditForm snippet={snippet} />
        </div>
    );
}
