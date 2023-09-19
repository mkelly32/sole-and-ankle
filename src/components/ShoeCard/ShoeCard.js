import React from 'react';
import styled from 'styled-components/macro';

import { COLORS, WEIGHTS } from '../../constants';
import { formatPrice, pluralize, isNewShoe } from '../../utils';
import Spacer from '../Spacer';

//const Flag = ({variant}) => {
//    switch (variant) {
//        case 'on-sale':
//            return null;
//        case 'new-releaes':
//            return null;
//        default:
//            return null;
//    }
//};

const ShoeCard = ({
  slug,
  name,
  imageSrc,
  price,
  salePrice,
  releaseDate,
  numOfColors,
}) => {
  // There are 3 variants possible, based on the props:
  //   - new-release
  //   - on-sale
  //   - default
  //
  // Any shoe released in the last month will be considered
  // `new-release`. Any shoe with a `salePrice` will be
  // on-sale. In theory, it is possible for a shoe to be
  // both on-sale and new-release, but in this case, `on-sale`
  // will triumph and be the variant used.
  // prettier-ignore
  const variant = typeof salePrice === 'number'
    ? 'on-sale'
    : isNewShoe(releaseDate)
      ? 'new-release'
      : 'default'

  return (
    <Link href={`/shoe/${slug}`}>
      {variant === 'default' ? null : <Flag variant={variant}>{variant === 'on-sale' ? 'Sale' : 'Just Released!'}</Flag>}
      <Wrapper>
        <ImageWrapper>
          <Image alt="" src={imageSrc} />
        </ImageWrapper>
        <Spacer size={12} />
        <Row>
          <Name>{name}</Name>
          <Price salePrice={salePrice}>{formatPrice(price)}</Price>
        </Row>
        <Row>
          <ColorInfo>{pluralize('Color', numOfColors)}</ColorInfo>
          {salePrice ? <SalePrice>{formatPrice(salePrice)}</SalePrice>: null}
        </Row>
      </Wrapper>
    </Link>
  );
};

const Link = styled.a`
  text-decoration: none;
  color: inherit;
  position: relative;
  isolation: isolate;
`;

const Wrapper = styled.article`
    flex: 1 1 344px;
`;

const ImageWrapper = styled.div`
  position: relative;
`;

const Image = styled.img`
    width: 344px;
    border-radius: 16px 16px 4px 4px;
`;

const Row = styled.div`
  font-size: 1rem;
  display: flex;
  justify-content: space-between;
`;

const Name = styled.h3`
  font-weight: ${WEIGHTS.medium};
  color: ${COLORS.gray[900]};
`;

const Price = styled.span`
    color: ${p => p.salePrice ? COLORS.gray['700'] : 'black'};
    text-decoration: ${p => p.salePrice ? 'line-through' : 'none'};
`;

const ColorInfo = styled.p`
  color: ${COLORS.gray[700]};
`;

const SalePrice = styled.span`
  font-weight: ${WEIGHTS.medium};
  color: ${COLORS.primary};
`;

const Flag = styled.div`
    background-color: ${p => p.variant === 'on-sale' ? COLORS.primary : COLORS.secondary};
    position: absolute;
    top: 12px;
    right: -4px;
    z-index: 1;
    padding: 10px 7px 10px 9px;
    color: ${COLORS.white};
    border-radius: 4px;
`;

export default ShoeCard;
