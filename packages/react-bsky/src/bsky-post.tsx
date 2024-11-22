"use client";

import { useEffect, useState } from "react";

// utils
export function formatDate(date: number | string | Date) {
  const d = new Date(date);
  return `${d.toLocaleDateString("en-us", {
    year: "numeric",
    month: "short",
    day: "numeric",
  })} at ${d.toLocaleTimeString(undefined, {
    hour: "numeric",
    minute: "2-digit",
  })}`;
}

// types
export type BskyPostProps = {
  /**
   * User Handle
   */
  handle: string;
  /**
   * Post ID
   */
  id: string;
};

export type Post = {
  author: {
    avatar: string;
    displayName: string;
    handle: string;
  };
  record: {
    text: string;
    createdAt: string;
  };
  likeCount: number;
  replyCount: number;
  repostCount: number;
};

// components
export const BskyPost = ({ handle, id }: BskyPostProps) => {
  const [post, setPost] = useState<Post>();

  useEffect(() => {
    fetch(
      `https://public.api.bsky.app/xrpc/app.bsky.feed.getPostThread?uri=at://${handle}/app.bsky.feed.post/${id}`
    )
      .then((res) => res.json())
      .then(
        (data: {
          thread: {
            post: Post;
          };
        }) => {
          setPost(data.thread.post);
        }
      );
  }, []);

  return (
    <>
      <style>
        {`
          .container {
            border: 1px solid #e5e7eb;
            border-radius: 0.75rem;
            padding-top: 0.75rem;
            padding-left: 1rem;
            padding-right: 1rem;
            padding-bottom: 0.625rem;
            background-color: white;
            transition-property: background-color;
            transition-duration: 0.2s;
            color: #000000;
            max-width: 600px;
            min-width: 300px;
          }
          .container:hover {
            background-color: #fafafa;
          }
          .inner {
            display: flex;
            flex-direction: column;
            gap: 0.5rem;
          }
          .header {
            display: flex;
            gap: 0.625rem;
            align-items: center;
          }
          .displayName {
            font-weight: bold;
            line-height: 1.25rem;
          }
          .handle {
            color: #42576C;
            line-height: inherit;
          }
          .avatar {
            width: 2.5rem;
            height: 2.5rem;
            border-radius: 9999px;
            overflow: hidden;
            flex-shrink: 0;
          }
          .text {
            font-size: 1.125rem;
            line-height: 1.75rem;
          }
          .time {
            color: #42576C;
            margin-top: 0.25rem;
            font-size: 0.875rem;
            line-height: 1.25rem;
          }
          .footer {
            border-top: 1px solid #e5e7eb;
            padding-top: 0.625rem;
            display: flex;
            gap: 1.25rem;
            align-items: center;
            font-size: 0.875rem;
          }

          .footer-action {
            display: flex;
            gap: 0.5rem;
            align-items: center;
            font-weight: bold;
            color: #737373;
          }

          .read-reply {
            color: #0A7AFF;
            font-weight: bold;
          }
        `}
      </style>
      <a
        href={`https://bsky.app/profile/${handle}/post/${id}`}
        target="_blank"
        rel="noopener noreferrer nofollow"
      >
        <div className="container">
          {!post ? (
            <p>Loading...</p>
          ) : (
            <div className="inner">
              <div className="header">
                <div className="avatar">
                  <img src={post.author.avatar} width="100%" height="100%" />
                </div>

                <div>
                  <p className="displayName">{post.author.displayName}</p>
                  <p className="handle">@{post.author.handle}</p>
                </div>

                <div style={{ flex: 1 }}></div>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width={35.8}
                  height={32}
                  viewBox="0 0 600 530"
                >
                  <path
                    fill="#1185fe"
                    d="M135.72 44.03C202.216 93.951 273.74 195.17 300 249.49c26.262-54.316 97.782-155.54 164.28-205.46C512.26 8.009 590-19.862 590 68.825c0 17.712-10.155 148.79-16.111 170.07-20.703 73.984-96.144 92.854-163.25 81.433 117.3 19.964 147.14 86.092 82.697 152.22-122.39 125.59-175.91-31.511-189.63-71.766-2.514-7.38-3.69-10.832-3.708-7.896-.017-2.936-1.193.516-3.707 7.896-13.714 40.255-67.233 197.36-189.63 71.766-64.444-66.128-34.605-132.26 82.697-152.22-67.108 11.421-142.55-7.45-163.25-81.433C20.15 217.613 9.997 86.535 9.997 68.825c0-88.687 77.742-60.816 125.72-24.795z"
                  />
                </svg>
              </div>

              <p className="text">{post.record.text}</p>

              <time dateTime={post.record.createdAt} className="time">
                {formatDate(post.record.createdAt)}
              </time>

              <div className="footer">
                <div className="footer-action">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    className="post_actionIcon__XTxkf"
                    width={20}
                    height={20}
                    viewBox="0 0 24 24"
                  >
                    <path
                      fill="#ec4899"
                      d="M12.489 21.372c8.528-4.78 10.626-10.47 9.022-14.47-.779-1.941-2.414-3.333-4.342-3.763-1.697-.378-3.552.003-5.169 1.287-1.617-1.284-3.472-1.665-5.17-1.287-1.927.43-3.562 1.822-4.34 3.764-1.605 4 .493 9.69 9.021 14.47a1 1 0 0 0 .978 0Z"
                    />
                  </svg>

                  {post.likeCount}
                </div>
                <div className="footer-action">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    width={20}
                    height={20}
                  >
                    <path
                      fill="#20bc07"
                      d="M17.957 2.293a1 1 0 1 0-1.414 1.414L17.836 5H6a3 3 0 0 0-3 3v3a1 1 0 1 0 2 0V8a1 1 0 0 1 1-1h11.836l-1.293 1.293a1 1 0 0 0 1.414 1.414l2.47-2.47a1.75 1.75 0 0 0 0-2.474l-2.47-2.47ZM20 12a1 1 0 0 1 1 1v3a3 3 0 0 1-3 3H6.164l1.293 1.293a1 1 0 1 1-1.414 1.414l-2.47-2.47a1.75 1.75 0 0 1 0-2.474l2.47-2.47a1 1 0 0 1 1.414 1.414L6.164 17H18a1 1 0 0 0 1-1v-3a1 1 0 0 1 1-1Z"
                    />
                  </svg>

                  {post.likeCount}
                </div>
                <div className="footer-action">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    className="post_actionIcon__XTxkf"
                    viewBox="0 0 24 24"
                    width={20}
                    height={20}
                  >
                    <path
                      fill="#0A7AFF"
                      d="M19.002 3a3 3 0 0 1 3 3v10a3 3 0 0 1-3 3H12.28l-4.762 2.858A1 1 0 0 1 6.002 21v-2h-1a3 3 0 0 1-3-3V6a3 3 0 0 1 3-3h14Z"
                    />
                  </svg>

                  Reply
                </div>

                <div style={{ flex: 1 }}></div>

                <p className="read-reply">Read {post.replyCount} replies on Bluesky</p>
              </div>
            </div>
          )}
        </div>
      </a>
    </>
  );
};