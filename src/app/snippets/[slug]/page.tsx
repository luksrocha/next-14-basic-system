import { deleteSnippet } from "@/actions/snippets";
import { db } from "@/db";
import Link from "next/link";
import { notFound } from "next/navigation";
import React from "react";

interface SnippetPageProps {
    params: {
        slug: string;
    };
}

export default async function SnippetPage({ params }: SnippetPageProps) {
    await new Promise((res) => {
        setTimeout(res, 2000);
    });

    const snippet = await db.snippet.findFirst({
        where: {
            id: Number(params.slug),
        },
    });

    if (!snippet) {
        return notFound();
    }

    const deleteSnippetAction = deleteSnippet.bind(null, snippet.id);

    return (
        <div>
            <div className="flex m-4 justify-between items-center">
                <h1 className="text-xl font-bold">{snippet.title}</h1>
                <div className="flex gap-4">
                    <Link
                        href={`/snippets/${snippet.id}/edit`}
                        className="p-2 border rounded"
                    >
                        Edit
                    </Link>
                    <form action={deleteSnippetAction}>
                        <button className="p-2 border rounded">Delete</button>
                    </form>
                </div>
            </div>
            <pre className="p-3 border rounded bg-gray-200 border-gray-200">
                <code>{snippet.code}</code>
            </pre>
        </div>
    );
}

export async function generateStaticParams() {
    const snippets = await db.snippet.findMany();

    return snippets.map((snippet) => ({ slug: snippet.id.toString() }));
}
