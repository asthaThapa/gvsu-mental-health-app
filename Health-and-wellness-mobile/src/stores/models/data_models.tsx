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
    secundaryBody?: string
    dosDonts: DosDonts[]
    howToHelp: howToHelp
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
    hidden?: boolean
}

export interface TechniqueBody {
    header: string
    body: string
}

export interface TechniqueInfo {
    header: string
    techniques: TechniqueBody[]
}

export interface contentList {
    subHeader: string
    description: string
}

export interface EmergencyInfo {
    title: string
    id: string
    content: contentList[]
    shouldShowCan?: boolean
}

export interface ResourceCardInfo {
    title: string
    id: string
    img: string
    subResources: SubResourceInfo[]
}

export interface SubResourceInfo {
    title: string,
    link?: string,
    phone?: string,
    email?: string
}

export interface howToHelp {
    description?: string,
    bullets: howToHelpBullet[]
}

export interface howToHelpBullet {
    title: string,
    description: string
}
