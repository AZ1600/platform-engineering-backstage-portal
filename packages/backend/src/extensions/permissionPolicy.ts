import {
  coreServices,
  createBackendModule,
  type UserInfoService,
} from '@backstage/backend-plugin-api';
import {
  AuthorizeResult,
  type PolicyDecision,
} from '@backstage/plugin-permission-common';
import {
  type PermissionPolicy,
  type PolicyQuery,
  type PolicyQueryUser,
} from '@backstage/plugin-permission-node';
import { policyExtensionPoint } from '@backstage/plugin-permission-node/alpha';

const PLATFORM_TEAM_REF = 'group:default/platform-team';

export class PlatformPermissionPolicy implements PermissionPolicy {
  constructor(private readonly userInfo: UserInfoService) {}

  async handle(
    request: PolicyQuery,
    user?: PolicyQueryUser,
  ): Promise<PolicyDecision> {
    // The Kubernetes proxy allows arbitrary Kubernetes API requests.
    // Keep this disabled for all portal users.
    if (request.permission.name === 'kubernetes.proxy') {
      return {
        result: AuthorizeResult.DENY,
      };
    }

    // Only members of the platform team may unregister catalog entities.
    if (request.permission.name === 'catalog.entity.delete') {
      if (!user) {
        return {
          result: AuthorizeResult.DENY,
        };
      }

      const userInfo = await this.userInfo.getUserInfo(user.credentials);

      const isPlatformEngineer =
        userInfo.ownershipEntityRefs.includes(PLATFORM_TEAM_REF);

      return {
        result: isPlatformEngineer
          ? AuthorizeResult.ALLOW
          : AuthorizeResult.DENY,
      };
    }

    // Normal catalog browsing and other existing portal capabilities
    // remain available unless explicitly restricted above.
    return {
      result: AuthorizeResult.ALLOW,
    };
  }
}

export default createBackendModule({
  pluginId: 'permission',
  moduleId: 'platform-policy',

  register(reg) {
    reg.registerInit({
      deps: {
        policy: policyExtensionPoint,
        userInfo: coreServices.userInfo,
      },

      async init({ policy, userInfo }) {
        policy.setPolicy(new PlatformPermissionPolicy(userInfo));
      },
    });
  },
});
