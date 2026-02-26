import type { Schema, Struct } from '@strapi/strapi';

export interface SharedFullImage extends Struct.ComponentSchema {
  collectionName: 'components_shared_full_image_s';
  info: {
    displayName: 'full image ';
  };
  attributes: {
    image: Schema.Attribute.Media<'images' | 'files'>;
  };
}

export interface SharedHeading extends Struct.ComponentSchema {
  collectionName: 'components_shared_headings';
  info: {
    displayName: 'heading';
  };
  attributes: {
    heading: Schema.Attribute.String;
  };
}

export interface SharedMedia extends Struct.ComponentSchema {
  collectionName: 'components_shared_media';
  info: {
    description: '';
    displayName: 'Media';
    icon: 'file-video';
  };
  attributes: {
    file: Schema.Attribute.Media<'images' | 'files'>;
  };
}

export interface SharedParagraphWithImage extends Struct.ComponentSchema {
  collectionName: 'components_shared_paragraph_with_image_s';
  info: {
    description: '';
    displayName: 'Paragraph with Image ';
  };
  attributes: {
    content: Schema.Attribute.RichText & Schema.Attribute.Required;
    image: Schema.Attribute.Media<'images'> & Schema.Attribute.Required;
    imageLandscape: Schema.Attribute.Boolean & Schema.Attribute.DefaultTo<true>;
    isImageReversed: Schema.Attribute.Boolean &
      Schema.Attribute.DefaultTo<false>;
  };
}

export interface SharedQuote extends Struct.ComponentSchema {
  collectionName: 'components_shared_quotes';
  info: {
    displayName: 'Quote';
    icon: 'indent';
  };
  attributes: {
    body: Schema.Attribute.Text;
    title: Schema.Attribute.String;
  };
}

export interface SharedRichText extends Struct.ComponentSchema {
  collectionName: 'components_shared_rich_texts';
  info: {
    description: '';
    displayName: 'Paragraph';
    icon: 'align-justify';
  };
  attributes: {
    body: Schema.Attribute.RichText;
  };
}

export interface SharedSeo extends Struct.ComponentSchema {
  collectionName: 'components_shared_seos';
  info: {
    description: '';
    displayName: 'Seo';
    icon: 'allergies';
    name: 'Seo';
  };
  attributes: {
    metaDescription: Schema.Attribute.Text & Schema.Attribute.Required;
    metaTitle: Schema.Attribute.String & Schema.Attribute.Required;
    shareImage: Schema.Attribute.Media<'images'>;
  };
}

export interface SharedSlider extends Struct.ComponentSchema {
  collectionName: 'components_shared_sliders';
  info: {
    description: '';
    displayName: 'Slider';
    icon: 'address-book';
  };
  attributes: {
    files: Schema.Attribute.Media<'images', true>;
  };
}

declare module '@strapi/strapi' {
  export module Public {
    export interface ComponentSchemas {
      'shared.full-image': SharedFullImage;
      'shared.heading': SharedHeading;
      'shared.media': SharedMedia;
      'shared.paragraph-with-image': SharedParagraphWithImage;
      'shared.quote': SharedQuote;
      'shared.rich-text': SharedRichText;
      'shared.seo': SharedSeo;
      'shared.slider': SharedSlider;
    }
  }
}
