import { createRoot } from 'react-dom/client';

const ROOT_NODE_ID = 'app';

const rootNode = document.getElementById(ROOT_NODE_ID);

if (rootNode) {
  const root = createRoot(rootNode);
  root.render(<div>App</div>);
}
