// 房间基础运营
type BaseRoleHarvester = 'harvester'
type BaseRoleFiller = 'filler'
type BaseRoleUpgrader = 'upgrader'
type BaseRoleBuilder = 'builder'
type BaseRoleRepairer = 'repairer'
type BaseRoleMiner = 'miner'
type BaseRoleScout = 'scout'

// 房间高级运营
type AdvancedRoleManager = 'manager'
type AdvancedRoleProcesser = 'processer'
type AdvancedRoleClaimer = 'claimer'
type AdvancedRoleReserver = 'reserver'

// 远程房间角色
type RemoteRoleHarvester = 'rHarvester'
type RemoteRoleFiller = 'rFiller'
type RemoteRoleBuilder = 'rBuilder'

// 战争角色
type WarRoleAttacker = 'attacker'
type WarRoleHealer = 'healer'
type WarRoleRangedAttacker = 'rAttacker'
type WarRoleDismantler = 'dismantler'
type WarRoleIntegrate = 'integrate'
type WarRoleDefender = 'defender'
type WarRoleRangedDefender = 'rdefender'
type WarRoleControllerAttacker = 'cAttacker'

// 所有的 creep 角色
type CreepRoleBaseConstant = BaseRoleHarvester | BaseRoleFiller | BaseRoleUpgrader | BaseRoleBuilder | BaseRoleRepairer | BaseRoleMiner | BaseRoleScout
type CreepRoleAdvConstant = AdvancedRoleManager | AdvancedRoleProcesser | AdvancedRoleClaimer | AdvancedRoleReserver
type CreepRoleRemoteConstant = RemoteRoleBuilder | RemoteRoleFiller | RemoteRoleHarvester
type CreepRoleWarConstant = WarRoleAttacker | WarRoleHealer | WarRoleRangedAttacker | WarRoleDismantler | WarRoleIntegrate | WarRoleDefender | WarRoleRangedDefender | WarRoleControllerAttacker
type CreepRoleConstant = CreepRoleBaseConstant | CreepRoleAdvConstant | CreepRoleRemoteConstant | CreepRoleWarConstant

type CreepWork = { [role in CreepRoleConstant]: ICreepConfig }
type CreepCheck = { [roleName in CreepRoleConstant]: (creep: Creep) => boolean }

type CreepRole = {
    [roleName in CreepRoleConstant]: {
        roleCode: string,                                                   // 短代号, 用于Creep名称
        warMode: boolean,                                                   // 是否无论战争还是和平都得孵化
        priority: number,                                                   // 孵化优先级, 越小越优先
        bodyPart: BodyPartConstant[],                                       // body配置
        boostMap?: { [bodyType in BodyPartConstant]: ResourceConstant },    // 是否必须boost, 以及boost配置
    }
}

interface ICreepConfig { exec: (creep: Creep) => void }

interface Creep {
    init(): void;
    exec(): void;
}

interface CreepMemory {
    role: string;
}
