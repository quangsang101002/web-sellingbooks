import { Outlet } from 'react-router-dom';
import { Container } from 'react-bootstrap';

function AdminLayout() {
  return (
    <Container>
      <div>
        Header <code>(FIXME: src/admin-site/layouts/AdminLayout.js)</code>
      </div>
      <Outlet />
      <div>
        Footer <code>(FIXME: src/admin-site/layouts/AdminLayout.js)</code>
      </div>
    </Container>
  );
}

export default AdminLayout;
