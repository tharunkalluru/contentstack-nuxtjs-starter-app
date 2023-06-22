import { Config, Region, LivePreview , Stack } from 'contentstack'

const CONTENTSTACK_API_KEY =  process.env.CONTENTSTACK_API_KEY
  const CONTENTSTACK_DELIVERY_TOKEN = process.env.CONTENTSTACK_DELIVERY_TOKEN
  const CONTENTSTACK_ENVIRONMENT= process.env.CONTENTSTACK_ENVIRONMENT
  const CONTENTSTACK_BRANCH= process.env.CONTENTSTACK_BRANCH
  const CONTENTSTACK_REGION= process.env.CONTENTSTACK_REGION
  const CONTENTSTACK_MANAGEMENT_TOKEN= process.env.CONTENTSTACK_MANAGEMENT_TOKEN
  const CONTENTSTACK_API_HOST= process.env.CONTENTSTACK_API_HOST
  const CONTENTSTACK_APP_HOST= process.env.CONTENTSTACK_APP_HOST
  const CONTENTSTACK_LIVE_PREVIEW= process.env.CONTENTSTACK_LIVE_PREVIEW

export const isBasicConfigValid = () => {
  if (
    !!CONTENTSTACK_API_KEY &&
    !!CONTENTSTACK_DELIVERY_TOKEN &&
    !!CONTENTSTACK_ENVIRONMENT
  ) {
    return true
  }
  return false
}
export const isLpConfigValid = () => {
  if (
    !!CONTENTSTACK_LIVE_PREVIEW &&
    !!CONTENTSTACK_MANAGEMENT_TOKEN &&
    !!CONTENTSTACK_API_HOST &&
    !!CONTENTSTACK_APP_HOST
  ) {
    return true
  }
  return false
}

const setRegion = (): Region => {
  let region = 'US' as keyof typeof Region
  if (!!CONTENTSTACK_REGION && CONTENTSTACK_REGION !== 'us') {
    region = CONTENTSTACK_REGION.toLocaleUpperCase().replace(
      '-',
      '_'
    ) as keyof typeof Region
  }
  return Region[region]
}

const setLivePreviewConfig = (): LivePreview => {
  if (!isLpConfigValid())
    throw new Error('Please first configure you LP config in .env file')
  return {
    management_token: CONTENTSTACK_MANAGEMENT_TOKEN as string,
    enable: CONTENTSTACK_LIVE_PREVIEW === 'true',
    host: CONTENTSTACK_API_HOST as string
  } as LivePreview
}

export const initializeContentStackSdk = (): Stack => {
  if (!isBasicConfigValid())
    throw new Error('Please set you .env file before running starter app')
  const stackConfig: Config = {
    api_key: CONTENTSTACK_API_KEY as string,
    delivery_token: CONTENTSTACK_DELIVERY_TOKEN as string,
    environment: CONTENTSTACK_ENVIRONMENT as string,
    region: setRegion(),
    branch: CONTENTSTACK_BRANCH || 'main'
  }
  if (CONTENTSTACK_LIVE_PREVIEW === 'true') {
    stackConfig.live_preview = setLivePreviewConfig()
  }
  return Stack(stackConfig)
}

export const customHostUrl = (baseUrl: string):string => {
  return baseUrl.replace("api", "cdn");
};

export const generateUrlBasedOnRegion = (): string[] => {
  return Object.keys(Region).map((region) => {
    if (region === "US") {
      return `cdn.contentstack.io`;
    }
    return `${region}-cdn.contentstack.com`;
  });
};

export const isValidCustomHostUrl = (url: string): boolean => {
  return url? !generateUrlBasedOnRegion().includes(url):false;
};
