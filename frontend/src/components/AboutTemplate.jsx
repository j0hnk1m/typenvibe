import React from 'react';
import { navigate, graphql } from 'gatsby';
import Layout from 'components/Layout';

export default function AboutTemplate({ data }) {
  const navigateHome = () => navigate('/');
  const { markdownRemark } = data; // data.markdownRemark holds your post data
  const { frontmatter, html } = markdownRemark;

  return (
    <Layout title={frontmatter.title}>
      <p onClick={navigateHome}>back</p>

      <div className="userguide">
        <h1>{frontmatter.title}</h1>
        <div
          className="content"
          dangerouslySetInnerHTML={{ __html: html }}
        />
      </div>
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
