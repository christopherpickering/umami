import Link from 'next/link';
import { GridColumn, GridTable, useBreakpoint } from 'react-basics';
import { useFormat, useMessages } from 'components/hooks';
import { formatDistanceToNow } from 'date-fns';
import Profile from 'components/common/Profile';

export function SessionsTable({ data = [] }: { data: any[]; showDomain?: boolean }) {
  const { formatMessage, labels } = useMessages();
  const breakpoint = useBreakpoint();
  const { formatValue } = useFormat();

  return (
    <GridTable data={data} cardMode={['xs', 'sm', 'md'].includes(breakpoint)}>
      <GridColumn name="pic" label="" width="90px">
        {row => <Profile seed={row.id} size={64} />}
      </GridColumn>
      <GridColumn name="id" label="ID">
        {row => (
          <Link href={`sessions/${row.id}`}>
            {row.id} ({row.firstAt !== row.lastAt ? 'YES' : 'NO'})
          </Link>
        )}
      </GridColumn>
      <GridColumn name="country" label={formatMessage(labels.country)}>
        {row => formatValue(row.country, 'country')}
      </GridColumn>
      <GridColumn name="city" label={formatMessage(labels.city)} />
      <GridColumn name="browser" label={formatMessage(labels.browser)}>
        {row => formatValue(row.browser, 'browser')}
      </GridColumn>
      <GridColumn name="os" label={formatMessage(labels.os)} />
      <GridColumn name="device" label={formatMessage(labels.device)}>
        {row => formatValue(row.device, 'device')}
      </GridColumn>
      <GridColumn name="createdAt" label={formatMessage(labels.created)}>
        {row => formatDistanceToNow(new Date(row.createdAt))}
      </GridColumn>
    </GridTable>
  );
}

export default SessionsTable;
