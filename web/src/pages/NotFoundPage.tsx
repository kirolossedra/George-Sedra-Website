import { Link } from 'react-router-dom';
import Arrow from '../components/Arrow';
import PageHeader from '../components/PageHeader';

export default function NotFoundPage() {
  return (
    <PageHeader label="404" title="Page not found." intro="The page you requested does not exist.">
      <div className="button-row page-header__actions">
        <Link className="button" to="/">Return home<Arrow /></Link>
      </div>
    </PageHeader>
  );
}
