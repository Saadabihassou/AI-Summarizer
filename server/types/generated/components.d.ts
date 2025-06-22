import type { Schema, Struct } from '@strapi/strapi';

export interface FooterSocialIcons extends Struct.ComponentSchema {
  collectionName: 'components_footer_social_icons';
  info: {
    displayName: 'socialIcons';
  };
  attributes: {
    icon: Schema.Attribute.Media<
      'images' | 'files' | 'videos' | 'audios',
      true
    >;
    socialMediaName: Schema.Attribute.String;
  };
}

export interface NavbarQuickLinks extends Struct.ComponentSchema {
  collectionName: 'components_navbar_quick_links';
  info: {
    displayName: 'quickLinks';
  };
  attributes: {
    text: Schema.Attribute.String;
    url: Schema.Attribute.String;
  };
}

export interface SharedOpenGraph extends Struct.ComponentSchema {
  collectionName: 'components_shared_open_graphs';
  info: {
    displayName: 'openGraph';
    icon: 'project-diagram';
  };
  attributes: {
    ogDescription: Schema.Attribute.String &
      Schema.Attribute.Required &
      Schema.Attribute.SetMinMaxLength<{
        maxLength: 200;
      }>;
    ogImage: Schema.Attribute.Media<'images'>;
    ogTitle: Schema.Attribute.String &
      Schema.Attribute.Required &
      Schema.Attribute.SetMinMaxLength<{
        maxLength: 70;
      }>;
    ogType: Schema.Attribute.String;
    ogUrl: Schema.Attribute.String;
  };
}

export interface SharedSeo extends Struct.ComponentSchema {
  collectionName: 'components_shared_seos';
  info: {
    displayName: 'seo';
    icon: 'search';
  };
  attributes: {
    canonicalURL: Schema.Attribute.String;
    keywords: Schema.Attribute.Text;
    metaDescription: Schema.Attribute.String &
      Schema.Attribute.Required &
      Schema.Attribute.SetMinMaxLength<{
        maxLength: 160;
        minLength: 50;
      }>;
    metaImage: Schema.Attribute.Media<'images'>;
    metaRobots: Schema.Attribute.String;
    metaTitle: Schema.Attribute.String &
      Schema.Attribute.Required &
      Schema.Attribute.SetMinMaxLength<{
        maxLength: 60;
      }>;
    metaViewport: Schema.Attribute.String;
    openGraph: Schema.Attribute.Component<'shared.open-graph', false>;
    structuredData: Schema.Attribute.JSON;
  };
}

export interface SummarizingPageForm extends Struct.ComponentSchema {
  collectionName: 'components_summarizing_page_forms';
  info: {
    displayName: 'form';
  };
  attributes: {
    description: Schema.Attribute.Text;
    maxChars: Schema.Attribute.Integer;
    placeholder: Schema.Attribute.String;
    submitButtonText: Schema.Attribute.String;
    title: Schema.Attribute.String;
  };
}

declare module '@strapi/strapi' {
  export module Public {
    export interface ComponentSchemas {
      'footer.social-icons': FooterSocialIcons;
      'navbar.quick-links': NavbarQuickLinks;
      'shared.open-graph': SharedOpenGraph;
      'shared.seo': SharedSeo;
      'summarizing-page.form': SummarizingPageForm;
    }
  }
}
