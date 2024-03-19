"use client";

interface ErrorPageProps {
    error: Error;
    reset: () => void;
}

const ErrorNewSnippetPage = ({ error, reset }: ErrorPageProps) => {
    return <div>{error.message}</div>;
};

export default ErrorNewSnippetPage;
