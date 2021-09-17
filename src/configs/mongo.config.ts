import { ConfigService } from '@nestjs/config';
import { TypegooseModuleOptions } from 'nestjs-typegoose';

export const getMongoConfig = async (
  configService: ConfigService,
): Promise<TypegooseModuleOptions> => {
  return {
    uri: getMongoString(configService),
    ...getMongoOptions(),
  };
};

const getMongoString = (configService: ConfigService) =>
  `mongodb://user:password@localhost:27018/project?authSource=admin&readPreference=primary&appname=MongoDB%20Compass&ssl=false`;

const getMongoOptions = () => ({
  useNewUrlParser: true,
  useUnifiedTopology: true,
});
