
// 房间基础运营
type BaseRoleHarvester = 'harvester'
type BaseRoleFiller = 'filler'
type BaseRoleUpgrader = 'upgrader'
type BaseRoleBuilder = 'builder'
type BaseRoleRepairer = 'repairer'
type BaseRoleMiner = 'miner'

// 房间高级运营
type AdvancedRoleManager = 'manager'
type AdvancedRoleProcesser = 'processer'
type AdvancedRoleClaimer = 'claimer'
type AdvancedRoleReserver = 'reserver'
type AdvancedRoleRemoteHarvester = 'remoteHarvester'
type AdvancedRoleRemoteFiller = 'remoteFiller'

// 战争角色
type WarRoleAttacker = 'attacker'
type WarRoleHealer = 'healer'
type WarRoleRangedAttacker = 'rangedAttacker'
type WarRoleDismantler = 'dismantler'
type WarRoleIntegrate = 'integrate'


// 所有的 creep 角色
type CreepRoleConstant = BaseRoleHarvester | BaseRoleFiller | BaseRoleUpgrader | BaseRoleBuilder
    | BaseRoleRepairer | BaseRoleMiner | AdvancedRoleManager | AdvancedRoleProcesser | AdvancedRoleClaimer
    | AdvancedRoleReserver | AdvancedRoleRemoteHarvester | AdvancedRoleRemoteFiller | WarRoleAttacker
    | WarRoleHealer | WarRoleRangedAttacker | WarRoleDismantler | WarRoleIntegrate

// Creep 工作逻辑集合 包含了每个角色应该做的工作
type CreepWork = { [role in CreepRoleConstant]: (data: CreepData) => ICreepConfig }

// 所有 Creep 角色的 Data 数据
type CreepData = EmptyData | HarvesterData | MineralData | FillerData | BuilderData | RepairerData


interface Room {
    my: boolean
    level: number

    enemies: Creep[]

    // 建筑缓存一键访问
    mineral: Mineral
    sources: Source[]

    ruins: Ruin[]
    tombstones: Tombstone[]
    droppedResource: Resource[]

    wallsNeedRepair: Structure[]
    structuresNeedRepair: Structure[]

    structures: Structure[]
    constructionSites: ConstructionSite[]

    roads: StructureRoad[]
    spawns: StructureSpawn[]
    ramparts: StructureRampart[]
    extensions: StructureExtension[]
    walls: StructureWall[]

    labs: StructureLab[]
    links: StructureLink[]
    towers: StructureTower[]
    containers: StructureContainer[]

    keeperLairs: StructureKeeperLair[]
    powerBanks: StructurePowerBank[]
    portals: StructurePortal[]

    nuker?: StructureNuker
    factory?: StructureFactory
    observer?: StructureObserver
    extractor?: StructureExtractor
    powerSpawn?: StructurePowerSpawn
    invaderCore?: StructureInvaderCore
    // storage: StructureStorage
    // terminal: StructureTerminal
    // controller: StructureController

    centerLink?: StructureLink
    controllerLink?: StructureLink
}

// Creep 基本工作接口定义
interface ICreepConfig {
    // 每次死后都会进行判断，只有返回 true 时才会重新发布孵化任务
    isNeed: (room: Room, creepName: string) => boolean
    // 准备阶段执行的方法, 返回 true 时代表准备完成
    doWork: (creep: Creep) => void
}

// Creep通用函数定义
interface Creep {
    pickupDroppedResource(allSource: boolean, range: number): boolean
}

interface Source {
    freeSpaceCount: number
}

interface Mineral {
    freeSpaceCount: number
}

interface Structure {
    doWork(): void
}

// 反应底物表接口
interface IReactionSource {
    [targetResourceName: string]: ResourceConstant[]
}

interface JobMemory {
    reserving: string[]
    remoteHarvester: string[]
    processTaksQueue: string[]
    remoteFiller: { [roomName: string]: number }
}

interface Memory {
    jobs: { [roomName: string]: JobMemory }
}

interface RoomMemory {
    infoPos?: RoomPosition
    managerPos?: RoomPosition
    centerPos?: RoomPosition

    sourceLab1?: string
    sourceLab2?: string

    autoLaylout?: boolean
    centerLinkSentMode?: boolean
    enableTowerRepairWall?: boolean
    towerAllowRepair?: string

    labReactionQueue: ResourceConstant[]

    creepSpawnQueue: string[]

    structureIdList: {}

    freeSpaceCount: { [sourceId: string]: number }
    creepConfig: { [creepName: string]: CreepMemory }
}

interface CreepMemory {
    role: CreepRoleConstant
    ready: boolean
    working: boolean
    spawnRoom: string
    spawnPriority: number
    data: CreepData
    dontPullMe?: boolean
}

interface EmptyData { }

interface HarvesterData { sourceId: string }
interface MineralData { sourceId: string }
interface FillerData { sourceId: string }

interface ManagerData { }
interface ProcesserData { waiting: number }

interface UpgraderData { sourceId: string }
interface BuilderData { sourceId: string, buildTarget?: string }
interface RepairerData { sourceId: string, repairTarget?: string }

interface BodySet {
    [MOVE]?: number
    [CARRY]?: number
    [ATTACK]?: number
    [RANGED_ATTACK]?: number
    [WORK]?: number
    [CLAIM]?: number
    [TOUGH]?: number
    [HEAL]?: number
}
