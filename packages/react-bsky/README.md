# react-bsky

`react-bsky` is a React component library that enables embedding Bluesky posts into your React applications.

## Installation

Install the package using npm:

```bash
npm install react-bsky
```

## Usage

Import the `BskyPost` component and use it in your React application:

```jsx
import { BskyPost } from 'react-bsky';

function App() {
  return (
    <div>
      <BskyPost handle="bryanprim.us" id="3la4tcw2npv2a" />
    </div>
  );
}
```

Replace `"bryanprim.us"` with the handle of the Bluesky user and `"3la4tcw2npv2a"` with the specific post ID you want to embed.

## Additional Information

For more details and advanced usage, refer to the [react-bsky documentation](https://react-bsky.vercel.app). 

> This project is still in development and may have some bugs or missing features. Please report any issues or suggestions for improvements.