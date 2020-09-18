import React from 'react';
import { navigate, graphql } from 'gatsby';
import Layout from 'components/layout/Layout';

export default function AboutTemplate({ data }) {
  const navigateHome = () => navigate('/');
  const { markdownRemark } = data; // data.markdownRemark holds your post data
  const { frontmatter, html } = markdownRemark;

  return (
    <Layout title={frontmatter.title}>
      <h1 className="text-secondary">{frontmatter.title}</h1>
      <div className="flex-col text-center text-secondary" dangerouslySetInnerHTML={{ __html: html }} />
    </Layout>
  );
}

export const pageQuery = graphql`
  query($slug: String!) {
    markdownRemark(frontmatter: { slug: { eq: $slug } }) {
      html
      frontmatter {
        slug
        title
      }
    }
  }
`;
