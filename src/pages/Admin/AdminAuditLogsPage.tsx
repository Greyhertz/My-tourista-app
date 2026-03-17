import { useQuery } from '@tanstack/react-query';
import { api } from '@/lib/api';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { ScrollArea } from '@/components/ui/scroll-area';
import { 
  Shield, 
  ShieldOff, 
  UserX, 
  Crown, 
  RefreshCw,
  Search,
  Filter,
} from 'lucide-react';
import { format } from 'date-fns';

interface AuditLog {
  id: string;
  actorUid: string;
  actorRole: string;
  action: string;
  targetUid: string | null;
  metadata: string | null;
  timestamp: string;
}

export function AdminAuditLogsPage() {
  const { data: logs, isLoading, refetch } = useQuery({
    queryKey: ['audit-logs'],
    queryFn: async () => {
      const res = await api.get<{ logs: AuditLog[] }>('/admin/audit-logs');
      return res.logs || [];
    },
  });

  const getActionIcon = (action: string) => {
    switch (action) {
      case 'suspend_user':
        return <ShieldOff className="h-4 w-4 text-red-500" />;
      case 'unsuspend_user':
        return <Shield className="h-4 w-4 text-green-500" />;
      case 'change_user_role':
        return <Crown className="h-4 w-4 text-purple-500" />;
      case 'revoke_tokens':
        return <UserX className="h-4 w-4 text-orange-500" />;
      default:
        return <Shield className="h-4 w-4 text-blue-500" />;
    }
  };

  const getActionLabel = (action: string) => {
    return action
      .split('_')
      .map(word => word.charAt(0).toUpperCase() + word.slice(1))
      .join(' ');
  };

  const getActionColor = (action: string) => {
    switch (action) {
      case 'suspend_user':
        return 'destructive';
      case 'unsuspend_user':
        return 'default';
      case 'change_user_role':
        return 'secondary';
      case 'revoke_tokens':
        return 'outline';
      default:
        return 'secondary';
    }
  };

  if (isLoading) {
    return <div className="p-6">Loading audit logs...</div>;
  }

  return (
    <div className="max-w-7xl space-y-6">
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle>Audit Logs</CardTitle>
              <CardDescription>
                Complete history of admin actions ({logs?.length || 0} events)
              </CardDescription>
            </div>
            <div className="flex items-center gap-2">
              <Button variant="outline" size="icon" onClick={() => refetch()}>
                <RefreshCw className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          {logs?.length === 0 ? (
            <div className="text-center py-12 text-muted-foreground">
              No audit logs yet
            </div>
          ) : (
            <ScrollArea className="h-[600px]">
              <div className="space-y-4">
                {logs?.map((log) => {
                  const metadata = log.metadata ? JSON.parse(log.metadata) : {};
                  
                  return (
                    <div
                      key={log.id}
                      className="flex items-start gap-4 p-4 rounded-lg border bg-card hover:bg-muted/50 transition-colors"
                    >
                      <div className="mt-1">
                        {getActionIcon(log.action)}
                      </div>
                      
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2 mb-1">
                          <Badge variant={getActionColor(log.action)}>
                            {getActionLabel(log.action)}
                          </Badge>
                          <span className="text-sm text-muted-foreground">
                            {format(new Date(log.timestamp), 'MMM dd, yyyy HH:mm:ss')}
                          </span>
                        </div>
                        
                        <p className="text-sm mb-2">
                          <span className="font-medium">Actor:</span>{' '}
                          <code className="text-xs bg-muted px-1.5 py-0.5 rounded">
                            {log.actorUid.slice(0, 8)}...
                          </code>
                          {' '}
                          <Badge variant="outline" className="text-xs">
                            {log.actorRole}
                          </Badge>
                        </p>
                        
                        {log.targetUid && (
                          <p className="text-sm mb-2">
                            <span className="font-medium">Target:</span>{' '}
                            <code className="text-xs bg-muted px-1.5 py-0.5 rounded">
                              {log.targetUid.slice(0, 8)}...
                            </code>
                          </p>
                        )}
                        
                        {metadata && Object.keys(metadata).length > 0 && (
                          <div className="text-xs text-muted-foreground mt-2 p-2 bg-muted/50 rounded">
                            <span className="font-medium">Details:</span>{' '}
                            {metadata.reason && <span>Reason: {metadata.reason}</span>}
                            {metadata.newRole && <span>New Role: {metadata.newRole}</span>}
                          </div>
                        )}
                      </div>
                    </div>
                  );
                })}
              </div>
            </ScrollArea>
          )}
        </CardContent>
      </Card>
    </div>
  );
}