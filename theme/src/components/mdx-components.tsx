/** @jsx jsx */
import { Link, graphql, useStaticQuery } from "gatsby";
import { GatsbyImage, GatsbyImageProps } from "gatsby-plugin-image";
import { pick, pickBy, identity } from "lodash";
import { LinkToStacked } from "react-stacked-pages-hook";
import { useWindowSize } from "react-use";
import { Styled, jsx, useColorMode } from "theme-ui";
import Tippy, { TipContentWrapper } from "./tippy";

export type AnchorTagProps = {
  href: string;
  to?: string;
  previews?: { [key: string]: React.ReactNode };
};

function AnchorTag({ href, previews, ...restProps }: AnchorTagProps) {
  const [colorMode] = useColorMode();
  const { width } = useWindowSize();
  const stacked = width >= 768;
  if (!href) {
    href = restProps.to as string;
  }

  const previewsMapping = previews || {};

  if (!href.match(/^http/)) {
    if (stacked) {
      return (
        <Tippy content={previewsMapping[href.replace(/^\//, "")]}>
          <LinkToStacked {...restProps} to={href} sx={{ variant: "links.internal" }} />
        </Tippy>
      );
    }
    return <Link {...restProps} to={href} sx={{ variant: "links.internal" }} />;
  }

  const externalVariant = `links.external-${colorMode}`;
  const tipContent = <TipContentWrapper>{href}</TipContentWrapper>;

  return (
    <Tippy content={tipContent} placement="top">
      <Styled.a {...restProps} href={href} sx={{ variant: externalVariant }} />
    </Tippy>
  );
}

type ImageProps = { src: string } & Omit<GatsbyImageProps, "image">;

function Image(props: ImageProps) {
  const { src, alt, ...rest } = props;
  const data = useStaticQuery(graphql`
    query ImageComponent {
      images: allFile(filter: { internal: { mediaType: { in: ["image/png", "image/jpeg"] } } }) {
        nodes {
          relativePath
          name
          childImageSharp {
            gatsbyImageData(layout: CONSTRAINED, width: 1800)
          }
        }
      }
    }
  `);

  if (src.match(/^http/)) {
    const imageProps = pick(rest, ["title", "alt", "className", "style"]);
    return <img src={src} {...pickBy(imageProps, identity)} />;
  }

  const image = data.images.nodes.find(({ relativePath }: { relativePath: string }) => {
    return relativePath.includes(src);
  });
  if (!image) {
    return null;
  }

  return <GatsbyImage loading="lazy" image={image.childImageSharp?.gatsbyImageData} alt={alt} />;
}

export default {
  a: AnchorTag,
  img: Image,
};
