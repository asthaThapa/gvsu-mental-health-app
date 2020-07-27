export interface WarningSigns {
    primaryHeader: string
    primarySigns: string[]
    secondaryHeader: string
    secondarySigns: string[]
}

export interface GuideBody {
    header: string
    body: string
}

export interface GuideResource {
    name: string
    body: string
}

export interface GuideTileInfo {
    subscript: string
    label: string
    description: string
    resourcesRelevant: GuideResource[]
    videoLink: string
    warningSigns: WarningSigns
    body?: GuideBody
    dosDonts: DosDonts[]
}

export interface DosDonts {
    do: string
    doBullets: string[]
    doLast?: string
    dont: string
    dontBullets: string[]
}

export interface HomeLinks {
    label: string
    link: string
}

export interface FaqInfo {
    question: string
    answer: string
}

export interface ResourceTile {
    department: string
    link: string
    phone: string
    email?: string
    picture: string
}

export interface TechniqueBody {
    header: string
    body: string
}

export interface TechniqueInfo {
    header: string
    techniques: TechniqueBody[]
}

export interface EmergencyInfo {
    title: string
    body: string
    shouldShowCan?: boolean
}
