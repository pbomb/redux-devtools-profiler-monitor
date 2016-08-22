import ProfilerMonitor from './ProfilerMonitor';
import profileActionMiddleware from './profileActionMiddleware';

export default ProfilerMonitor;
export const middleware = profileActionMiddleware;
