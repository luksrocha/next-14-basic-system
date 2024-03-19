"use client";
import { editSnippet } from "@/actions/snippets";
import { Editor } from "@monaco-editor/react";
import { Snippet } from "prisma/prisma-client";
import React, { useState } from "react";

interface SnippetEditFormProps {
    snippet: Snippet;
}

const SnippetEditForm = ({ snippet }: SnippetEditFormProps) => {
    const [code, setCode] = useState(snippet.code);

    const handleEditorChange = (value: string = "") => {
        setCode(value);
    };

    const editSnippetAction = editSnippet.bind(null, snippet.id, code);

    return (
        <div>
            <Editor
                height="40vh"
                theme="vs-dark"
                language="javascript"
                defaultValue={code}
                options={{
                    minimap: { enabled: false },
                }}
                onChange={handleEditorChange}
            />
            <form action={editSnippetAction}>
                <button type="submit" className="p-2 border rounded">
                    Save
                </button>
            </form>
        </div>
    );
};

export { SnippetEditForm };
